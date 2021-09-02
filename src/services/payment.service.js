const httpStatus = require('http-status');
const Stripe = require('stripe');
const moment = require('moment-timezone');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const planConfig = require('../config/plan');
const subscriberService = require('./subscriber.service');

const stripe = new Stripe(config.stripe.stripeSecretKey);

// const getProduct = async (productId) => {
//   const product = await stripe.products.retrieve(productId);
//   return { product };
// };

const getCustomer = async (customerId) => {
  try {
    const customer = await Payment.findOne({ customerStripeId: customerId });
    return customer;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
};

const getInvoice = async (invoiceId) => {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    return { invoice };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice request failed');
  }
};

const getSubscriptions = async (customerId) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method'],
  });

  return { subscriptions };
};

const paymentUpdate = async ({ customerId, subscriptionId }) => {
  const payment = await Payment.findOneAndUpdate(
    { customerStripeId: customerId },
    { customerSubscriptionId: subscriptionId },
    { new: true }
  );
  return { payment };
};

const findCustomer = async (email) => {
  const customer = await Payment.findOne({ email });
  return customer;
};

const createStripeCustomer = async ({ user }) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
    });
    const customer = await Payment.create({ user: user.id, email: user.email, customerStripeId: stripeCustomer.id });
    return customer;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not created');
  }
};

const PricesList = async () => {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
  });
  return {
    prices: prices.data,
  };
};

const stripeCustomer = async ({ user }) => {
  try {
    const customer = await findCustomer(user.email);
    if (customer) {
      return customer;
    }
    const newCustomer = await createStripeCustomer({ user });
    return newCustomer;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not found or create');
  }
};

const createCheckoutSessions = async ({ customerId, priceId }) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      // customer_email: customerEmail,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${config.frontendUrl.web}/payment/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendUrl.web}/payment/canceled.html`,
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

const cancelSubscription = async ({ subscriptionId }) => {
  try {
    const deletedSubscription = await stripe.subscriptions.del(subscriptionId);

    return { subscription: deletedSubscription };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription not cancelled');
  }
};

const updateSubscription = async ({ subscriptionId, newPriceId }) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    });

    return { subscription: updatedSubscription };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription not updated');
  }
};

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

    const { email } = await getCustomer(customer);

    await Payment.findOneAndUpdate({ email }, { customerSubscriptionId: id }, { new: true });

    const { subscriptionPlan } = planConfig;

    let planData = {};

    if (status === 'active') {
      switch (plan.amount) {
        case subscriptionPlan.monthStarter.amount:
          planData = {
            creadit: subscriptionPlan.monthStarter.creadit,
            package: subscriptionPlan.monthStarter.package,
          };
          break;

        case subscriptionPlan.yearStarter.amount:
          planData = {
            creadit: subscriptionPlan.yearStarter.creadit,
            package: subscriptionPlan.yearStarter.package,
          };
          break;

        case subscriptionPlan.monthProfessinal.amount:
          planData = {
            creadit: subscriptionPlan.monthProfessinal.creadit,
            package: subscriptionPlan.monthProfessinal.package,
          };
          break;

        case subscriptionPlan.yearProfessinal.amount:
          planData = {
            creadit: subscriptionPlan.yearProfessinal.creadit,
            package: subscriptionPlan.yearProfessinal.package,
          };
          break;

        default:
          break;
      }

      let oldCreadit = 0;

      const subscriber = await subscriberService.getOwnSubscribe(email);

      if (subscriber.isPaidSubscribers === true) {
        oldCreadit = subscriber.credits * 1;
      }

      await subscriberService.updateOwnSubscribe(email, {
        credits: planData.creadit + oldCreadit,
        subscription: planData.package,
        subscriptionExpire: moment.unix(current_period_end).format(),
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
  stripeCustomer,
  createCheckoutSessions,
  checkoutSession,
  createSubscription,
  PricesList,
  cancelSubscription,
  updateSubscription,
  invoicePreview,
  getInvoice,
  getSubscriptions,
  handlePaymentSucceeded,
  handlePaymentFailed,
};
