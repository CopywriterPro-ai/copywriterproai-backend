/* eslint-disable camelcase */
const httpStatus = require('http-status');
const Stripe = require('stripe');
const moment = require('moment-timezone');
const { Subscriber } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const { subscription: subscriptionConst } = require('../config/plan');
const { subscriptionPlan } = require('../config/plan');
const subscriberService = require('./subscriber.service');

const stripe = new Stripe(config.stripe.stripeSecretKey);

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
  const payment = await Subscriber.findOneAndUpdate(
    { customerStripeId: customerId },
    { activeSubscription: { subscriptionId } },
    { new: true }
  );
  return { payment };
};

const findCustomer = async (userId) => {
  const customer = await Subscriber.findOne({ userId, customerStripeId: { $ne: null } });
  return customer;
};

const createStripeCustomer = async ({ user }) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.userId },
    });
    // const customer = await Payment.create({ userId: user.userId, customerStripeId: stripeCustomer.id });
    const customer = await Subscriber.findOneAndUpdate(
      { userId: user.userId },
      { customerStripeId: stripeCustomer.id },
      { new: true }
    );
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
  const payment = await Subscriber.findOne({ userId });
  if (payment) {
    return payment.subscriptionAll;
  }
  return [];
};

const createCheckoutSessions = async ({ customerId, priceId, referenceId, trialEligible }) => {
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
      client_reference_id: referenceId,

      ...(trialEligible && {
        subscription_data: {
          trial_period_days: config.trial.days,
        },
      }),
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

const updateSubscriptionPlan = async ({ subscriptionId, bool = true }) => {
  try {
    const deletedSubscription = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: bool });
    return { subscription: deletedSubscription };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription cancelling failed');
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

    if (!paymentIntentId) {
      const expire = dataObject.lines.data[0].period.end;
      const subscriptionExpire = moment.unix(expire).format();

      const customerTrailSubscription = {
        subscription: subscriptionConst.FREEMIUM,
        subscriptionId,
        subscriptionExpire,
        words: config.trial.words,
        paymentMethod: 'stripe',
      };

      await Subscriber.findOneAndUpdate(
        { customerStripeId: dataObject.customer },
        {
          activeSubscription: customerTrailSubscription,
        }
      );

      return { message: 'success' };
    }

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
        subscription: priceKey,
        subscriptionId: id,
        subscriptionExpire,
        words,
        paymentMethod: 'stripe',
      };

      await Subscriber.findOneAndUpdate(
        { customerStripeId: customer },
        {
          $pull: { subscriptionAll: { subscriptionId: id } },
        },
        { new: true }
      );

      const { userId } = await Subscriber.findOneAndUpdate(
        { customerStripeId: customer },
        {
          $push: { subscriptionAll: customerSubscription },
        }
      );

      await subscriberService.updateOwnSubscribe(userId, {
        activeSubscription: customerSubscription,
      });

      return { message: 'success' };
    }
  }
};

const handlePaymentFailed = async () => {
  // console.log(dataObject);
  console.log('Payment failed');
};

const handleUDPPaymentSucceeded = async (body) => {
  const { invoice_id, metadata, amount } = body;
  const { user_id, price_key } = metadata;

  const planData = subscriptionPlan[price_key];
  if (!planData || amount !== planData.price.bdt) {
    return { message: 'failed' };
  }
  const { words, month } = planData;
  const subscriptionExpire = moment().add(month, 'M');

  const customerSubscription = {
    subscription: price_key,
    subscriptionId: invoice_id,
    subscriptionExpire,
    words,
    paymentMethod: 'mobilebanking',
  };

  try {
    const { userId } = await Subscriber.findOneAndUpdate(
      { userId: user_id },
      {
        $push: { subscriptionAll: customerSubscription },
      }
    );

    await subscriberService.updateOwnSubscribe(userId, {
      activeSubscription: customerSubscription,
    });

    return { message: 'success' };
  } catch (error) {
    return { message: 'failed' };
  }
};

const handleTrialEnd = async ({ subscriptionId }) => {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      trial_end: 'now',
    });
    return { message: 'success' };
  } catch (error) {
    return { message: 'failed' };
  }
};

module.exports = {
  findCustomer,
  paymentUpdate,
  getSubscriberMe,
  stripeCustomer,
  createCheckoutSessions,
  checkoutSession,
  PricesList,
  updateSubscriptionPlan,
  invoicePreview,
  getInvoice,
  getSubscriptions,
  handlePaymentSucceeded,
  handlePaymentFailed,
  handleUDPPaymentSucceeded,
  handleTrialEnd,
};
