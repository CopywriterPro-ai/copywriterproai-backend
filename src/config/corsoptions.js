const { cors } = require('./config');

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  const { origin } = req.headers;
  if (cors.whitelist.includes(req.header('Origin'))) {
    corsOptions = { origin };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
