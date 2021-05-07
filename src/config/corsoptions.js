const { cors } = require('./config');

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (cors.whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
