const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// Configure dotenv to load environment variables from a specific path
dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Define a schema using Joi to validate and describe the expected structure
 * and constraints of environment variables. This ensures all required
 * environment variables are provided and have correct formats.
 */
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_EXTENSION_ACCESS_EXPIRATION_MONTHS: Joi.number()
      .default(6)
      .description('months after which extension access tokens expire'),
    OPENAI_API_KEY: Joi.string().required().description('OpenAI secret key'),
    COPYSCAPE_USERNAME: Joi.string().required().description('Copyscape username'),
    COPYSCAPE_API_KEY: Joi.string().required().description('Copyscape API key'),
    STRIPE_SECRET_KEY: Joi.string().required().description('Stripe secret key'),
    STRIPE_WEBHOOK_SECRET_KEY: Joi.string().description('Stripe webhook secret key'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    GOOGLE_OAUTH2_CLIENT_ID: Joi.string().required().description('google oauth2 client id'),
    GOOGLE_OAUTH2_SECRET_ID: Joi.string().required().description('google oauth2 secret id'),
    FACEBOOK_APP_ID: Joi.string().required().description('facebook oauth app id'),
    FACEBOOK_APP_SECRET: Joi.string().required().description('facebook oauth app secret'),
    PASSPORT_SECRET_JWT_KEY: Joi.string().required().description('passport secret jwt key'),
    PASSPORT_AUTH_EXPIRES_TIME: Joi.string().default('10s').description('passport auth expires time'),
    WEB_CLIENT_URL: Joi.string().required().description('frontend web url'),
    MAIL_VERIFY_TOKEN_SECRET: Joi.string().required().description('Mail verify token secret'),
    MAIL_VERIFY_TOKEN_EXPIRE: Joi.string().default('10m').description('Mail verify token expires'),
    CORS_WHITELIST: Joi.string().default('*').description('Cors whitelist'),
    SENTRY_DNS_URL: Joi.string().uri().required().description('sentry dns url'),
    TRIAL_DAYS: Joi.number().default(7).description('Trial days'),
    TRIAL_WORDS: Joi.number().default(700).description('Trial words'),
    TRIAL_PLAGIARISM_CHECKER_WORDS: Joi.number().default(0).description('Trial plagiarism checker words'),
    PACKAGES: Joi.string().default('').description('Current packages'),
    PLAGIARISM_CHECKER_ALLOWED_PACKAGES: Joi.string().default('').description('Plagiarism checker allowed packages'),
    INPUT_CHARACTER_RATE: Joi.string().default('').description('Per package input character rate'),
    IGNORE_CONTENT_SAVING_EMAIL: Joi.string().allow('').default('').description('Ignore content saving email'),
  })
  .unknown(); // Allow unknown keys in environment variables

// Validate the environment variables against the schema
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// If validation fails, throw an error with the validation message
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Export the validated and processed environment variables as a configuration object
module.exports = {
  env: envVars.NODE_ENV, // Environment: production, development, or test
  port: envVars.PORT, // Server port
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''), // MongoDB connection URL with test suffix in test environment
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET, // JWT secret key
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES, // Access token expiration time
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS, // Refresh token expiration time
    resetPasswordExpirationMinutes: 10, // Password reset token expiration time
    extensionAccessExpirationMonths: envVars.JWT_EXTENSION_ACCESS_EXPIRATION_MONTHS, // Extended access token expiration time
  },
  passportConfig: {
    authSecretKey: envVars.PASSPORT_SECRET_JWT_KEY, // Passport authentication secret key
    authExpireTime: envVars.PASSPORT_AUTH_EXPIRES_TIME, // Passport authentication expiration time
  },
  googleOauth2: {
    clientId: envVars.GOOGLE_OAUTH2_CLIENT_ID, // Google OAuth2 client ID
    secretId: envVars.GOOGLE_OAUTH2_SECRET_ID, // Google OAuth2 secret ID
  },
  facebookOauth: {
    appId: envVars.FACEBOOK_APP_ID, // Facebook OAuth app ID
    appSecret: envVars.FACEBOOK_APP_SECRET, // Facebook OAuth app secret
  },
  openAI: {
    openAIAPIKey: envVars.OPENAI_API_KEY, // OpenAI API key
  },
  copyscape: {
    copyscapeUsername: envVars.COPYSCAPE_USERNAME, // Copyscape username
    copyscapeAPIKey: envVars.COPYSCAPE_API_KEY, // Copyscape API key
  },
  stripe: {
    stripeSecretKey: envVars.STRIPE_SECRET_KEY, // Stripe secret key
    webHookSecretKey: envVars.STRIPE_WEBHOOK_SECRET_KEY, // Stripe webhook secret key
  },
  verifyMail: {
    jwtSecret: envVars.MAIL_VERIFY_TOKEN_SECRET, // Mail verification JWT secret
    jwtExpires: envVars.MAIL_VERIFY_TOKEN_EXPIRE, // Mail verification token expiration
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST, // SMTP server host
      port: envVars.SMTP_PORT, // SMTP server port
      auth: {
        user: envVars.SMTP_USERNAME, // SMTP server username
        pass: envVars.SMTP_PASSWORD, // SMTP server password
      },
    },
    from: envVars.EMAIL_FROM, // Default from address for emails
  },
  frontendUrl: {
    web: envVars.WEB_CLIENT_URL, // Frontend web client URL
  },
  cors: {
    whitelist: envVars.CORS_WHITELIST.split(','), // CORS whitelist
  },
  sentry: {
    dns: envVars.SENTRY_DNS_URL, // Sentry DNS URL for error tracking
  },
  trial: {
    days: envVars.TRIAL_DAYS, // Number of trial days
    words: envVars.TRIAL_WORDS, // Number of trial words
    plagiarismCheckerWords: envVars.TRIAL_PLAGIARISM_CHECKER_WORDS, // Number of trial plagiarism checker words
  },
  inputLimit: {
    packages: envVars.PACKAGES.split(', '), // List of current packages
    inputCharacterRate: envVars.INPUT_CHARACTER_RATE.split(',').map(Number), // Character rate per package
  },
  plagiarismChecker: {
    allowedPackages: envVars.PLAGIARISM_CHECKER_ALLOWED_PACKAGES.split(','), // Packages allowed for plagiarism checking
  },
  content: {
    ignoresavingdb: envVars.IGNORE_CONTENT_SAVING_EMAIL.split(','), // Emails to ignore for content saving
  },
};
