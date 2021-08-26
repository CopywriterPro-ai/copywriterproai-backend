const httpStatus = require('http-status');
const Stripe = require('stripe');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const stripe = new Stripe(config.stripe.stripeSecretKey);

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

module.exports = {
  paymentUpdate,
  stripeCustomer,
  createCheckoutSessions,
  checkoutSession,
  createSubscription,
  PricesList,
  cancelSubscription,
  updateSubscription,
  invoicePreview,
};
