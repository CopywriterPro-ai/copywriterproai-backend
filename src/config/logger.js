const winston = require('winston');
const config = require('./config');

/**
 * Custom format to enumerate error stack traces in the log messages.
 * If the log information is an instance of Error, it assigns the error stack to the message property.
 * This helps in providing detailed error information in the logs.
 *
 * @param {Object} info - The log information object.
 * @returns {Object} The modified log information object with error stack as message if it is an Error.
 */
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

/**
 * Create a Winston logger instance with customized settings.
 * The logger configuration changes based on the environment (development or production).
 * In development, the logs are colored for better readability.
 * In production, the logs are uncolored for simplicity.
 *
 * The logger captures messages at 'debug' level in development and 'info' level in production.
 *
 * @returns {Object} Winston logger instance.
 */
const logger = winston.createLogger({
  // Set the logging level based on the environment.
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    // Apply the custom error format.
    enumerateErrorFormat(),
    // Colorize logs in development for better readability.
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    // Format log messages with string interpolation.
    winston.format.splat(),
    // Customize the final log message format.
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    // Log to the console. Errors are logged to stderr.
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
