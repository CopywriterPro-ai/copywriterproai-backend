const httpStatus = require('http-status');
const Stripe = require('stripe');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const stripe = new Stripe(config.stripe.stripeSecretKey);

const findCustomer = async (user) => {
  const customer = await Payment.findOne({ user });
  return customer;
};

const createStripeCustomer = async ({ user }) => {
  const stripeCustomer = await stripe.customers.create({
    email: user.email,
  });
  const customer = await Payment.create({ user: user.id, customerId: stripeCustomer.id });
  return customer;
};

const stripeCustomer = async ({ user }) => {
  const customer = await findCustomer(user.id);
  if (customer) {
    return customer;
  }
  const newCustomer = await createStripeCustomer({ user });
  return newCustomer;
};

const createSubscription = async ({ paymentMethodId, customerId, priceId }) => {
  try {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  } catch (error) {
    throw new ApiError(httpStatus.PAYMENT_REQUIRED, error.message);
  }

  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
};

module.exports = { createStripeCustomer, stripeCustomer, createSubscription };
