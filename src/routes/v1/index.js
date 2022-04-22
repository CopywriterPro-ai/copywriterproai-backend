const express = require('express');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const contentRoute = require('./content.route');
const plagiarismCheckerRoute = require('./plagiarismChecker.routes');
const paymentRoute = require('./payment.route');
const interestRoute = require('./interest.route');
const supportRoute = require('./support.route');
const toolRoute = require('./tool.route');
const blogRoute = require('./blog.route');
const subscriberRoute = require('./subscriber.route');
const demoRoute = require('./demo.route');
const extensionRoute = require('./extension.route');
const noticeRoute = require('./notice.route');

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
    route: contentRoute,
  },
  {
    path: '/plagiarism-checker',
    route: plagiarismCheckerRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/interests',
    route: interestRoute,
  },
  {
    path: '/support',
    route: supportRoute,
  },
  {
    path: '/tools',
    route: toolRoute,
  },
  {
    path: '/blogs',
    route: blogRoute,
  },
  {
    path: '/subscriber',
    route: subscriberRoute,
  },
  {
    path: '/demo',
    route: demoRoute,
  },
  {
    path: '/extension',
    route: extensionRoute,
  },
  {
    path: '/notice',
    route: noticeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
