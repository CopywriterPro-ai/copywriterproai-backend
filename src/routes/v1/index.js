const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const generatorRoute = require('./generator.route');
const paymentRoute = require('./payment.route');
const interestRoute = require('./interest.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/contents',
    route: generatorRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/interests',
    route: interestRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
