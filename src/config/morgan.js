const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');

// Define a custom token to include the error message in the log if available
morgan.token('message', (req, res) => res.locals.errorMessage || '');

/**
 * Helper function to get the IP format based on the environment.
 * In production, include the remote address in the logs.
 * In other environments, exclude the remote address for simplicity.
 *
 * @returns {string} The format string for the IP address.
 */
const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');

// Define the format for successful responses
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;

// Define the format for error responses, including the error message if available
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

/**
 * Morgan middleware to log successful HTTP requests.
 *
 * @param {Object} options - The options for morgan middleware.
 * @returns {Function} The morgan middleware function for logging successful requests.
 */
const successHandler = morgan(successResponseFormat, {
  // Skip logging for error responses (status codes >= 400)
  skip: (req, res) => res.statusCode >= 400,
  // Stream the log messages to the custom logger at the 'info' level
  stream: { write: (message) => logger.info(message.trim()) },
});

/**
 * Morgan middleware to log error HTTP requests.
 *
 * @param {Object} options - The options for morgan middleware.
 * @returns {Function} The morgan middleware function for logging error requests.
 */
const errorHandler = morgan(errorResponseFormat, {
  // Skip logging for successful responses (status codes < 400)
  skip: (req, res) => res.statusCode < 400,
  // Stream the log messages to the custom logger at the 'error' level
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
