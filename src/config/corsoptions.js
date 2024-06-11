const { cors } = require('./config');

/**
 * Function to dynamically configure CORS options based on the request origin.
 * This function checks if the request's origin is in the whitelist, and sets
 * the appropriate CORS options.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Function} callback - A callback function to set the CORS options.
 */
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  // Extract the origin header from the request
  const { origin } = req.headers;

  // Check if the origin is in the whitelist
  if (cors.whitelist.includes(origin)) {
    // If the origin is whitelisted, allow the request
    corsOptions = { origin };
  } else {
    // If the origin is not whitelisted, block the request
    corsOptions = { origin: false };
  }

  // Pass the CORS options to the callback
  callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
