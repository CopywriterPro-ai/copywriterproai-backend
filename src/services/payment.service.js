const httpStatus = require('http-status');
const Stripe = require('stripe');
const moment = require('moment-timezone');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const { subscriptionPlan } = require('../config/plan');
const subscriberService = require('./subscriber.service');

const stripe = new Stripe(config.stripe.stripeSecretKey);

// const getProduct = async (productId) => {
//   const product = await stripe.products.retrieve(productId);
//   return { product };
// };

// const getCustomer = async (customerId) => {
//   try {
//     const customer = await Payment.findOne({ customerStripeId: customerId });
//     return customer;
//   } catch (error) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
//   }
// };

const getInvoice = async (invoiceId) => {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    return { invoice };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice request failed');
  }
};

const getSubscriptions = async (customerId, status = 'all') => {
  const subscriptions = await stripe.subscriptions.list({
    ...(customerId && { customer: customerId }),
    status,
  });

  return { subscriptions: subscriptions.data };
};

const paymentUpdate = async ({ customerId, subscriptionId }) => {
  const payment = await Payment.findOneAndUpdate(
    { customerStripeId: customerId },
    { customerSubscriptionId: subscriptionId },
    { new: true }
  );
  return { payment };
};

const findCustomer = async (userId) => {
  const customer = await Payment.findOne({ userId });
  return customer;
};

const createStripeCustomer = async ({ user }) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.userId },
    });
    const customer = await Payment.create({ userId: user.userId, customerStripeId: stripeCustomer.id });
    return customer;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not created');
  }
};

const PricesList = async ({ activeProduct }) => {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
  });

  if (activeProduct) {
    const ActivePrices = prices.data.filter((price) => price.product.active);
    return { prices: ActivePrices };
  }

  return {
    prices: prices.data,
  };
};

const stripeCustomer = async ({ user }) => {
  try {
    const customer = await findCustomer(user.userId);
    if (customer) {
      return customer;
    }
    const newCustomer = await createStripeCustomer({ user });
    return newCustomer;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not found or create');
  }
};

const getSubscriberMe = async (userId) => {
  const payment = await Payment.findOne({ userId });
  if (payment) {
    return payment.customerSubscription;
  }
  return [];
};

const createCheckoutSessions = async ({ customerId, priceId }) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${config.frontendUrl.web}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendUrl.web}/payment/canceled`,
    });
    return { session };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription sessions not created');
  }
};

const checkoutSession = async ({ sessionId }) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return { session };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sessions not created');
  }
};

const createSubscription = async ({ customerId, priceId }) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    return {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription not created');
  }
};

const updateSubscriptionPlan = async ({ subscriptionId, bool = true }) => {
  try {
    const deletedSubscription = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: bool });
    return { subscription: deletedSubscription };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription cancelling failed');
  }
};

// const updateSubscription = async ({ subscriptionId, newPriceId }) => {
//   try {
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);
//     const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
//       items: [
//         {
//           id: subscription.items.data[0].id,
//           price: newPriceId,
//         },
//       ],
//     });

//     return { subscription: updatedSubscription };
//   } catch (error) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription not updated');
//   }
// };

const invoicePreview = async ({ customerId, priceId, subscriptionId }) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const invoice = await stripe.invoices.retrieveUpcoming({
    customer: customerId,
    subscription: subscriptionId,
    subscription_items: [
      {
        id: subscription.items.data[0].id,
        price: priceId,
      },
    ],
  });

  return { invoice };
};

const handlePaymentSucceeded = async (dataObject) => {
  if (dataObject.billing_reason === 'subscription_create') {
    const subscriptionId = dataObject.subscription;
    const paymentIntentId = dataObject.payment_intent;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      default_payment_method: paymentIntent.payment_method,
    });

    // eslint-disable-next-line camelcase
    const { status, plan, customer, id, current_period_end } = subscription;

    if (status === 'active') {
      const { priceKey } = plan.metadata;
      const planData = subscriptionPlan[priceKey];
      const subscriptionExpire = moment.unix(current_period_end).format();
      const { words } = planData;

      const customerSubscription = {
        Subscription: priceKey,
        subscriptionId: id,
        subscriptionExpire,
        words,
      };

      await Payment.findOneAndUpdate(
        { customerStripeId: customer },
        {
          $pull: { customerSubscription: { subscriptionId: id } },
        },
        { new: true }
      );

      const { userId } = await Payment.findOneAndUpdate(
        { customerStripeId: customer },
        {
          $push: { customerSubscription },
        },
        { new: true }
      );

      await subscriberService.updateOwnSubscribe(userId, {
        words,
        subscription: priceKey,
        subscriptionExpire,
        subscriptionId: id,
      });

      return { message: 'success' };
    }
  }
};

const handlePaymentFailed = async () => {
  // console.log(dataObject);
  console.log('Payment failed');
};

module.exports = {
  findCustomer,
  paymentUpdate,
  getSubscriberMe,
  stripeCustomer,
  createCheckoutSessions,
  checkoutSession,
  createSubscription,
  PricesList,
  updateSubscriptionPlan,
  // updateSubscription,
  invoicePreview,
  getInvoice,
  getSubscriptions,
  handlePaymentSucceeded,
  handlePaymentFailed,
};
