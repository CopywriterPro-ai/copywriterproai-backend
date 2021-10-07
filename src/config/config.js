const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    OPENAI_API_KEY: Joi.string().required().description('OpenAI secret key'),
    STRIPE_SECRET_KEY: Joi.string().required().description('Stripe secret key'),
    STRIPE_WEBHOOK_SECRET_KEY: Joi.string().description('Stripe webhook secret key'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    GOOGLE_OAUTH2_CLIENT_ID: Joi.string().required().description('google oauth2 client id'),
    GOOGLE_OAUTH2_SECRET_ID: Joi.string().required().description('google oauth2 secret id'),
    FACEBOOK_APP_ID: Joi.string().required().description('facebook oauth app secret'),
    FACEBOOK_APP_SECRET: Joi.string().required().description('facebook oauth app id'),
    PASSPORT_SECRET_JWT_KEY: Joi.string().required().description('passport secret jwt key'),
    PASSPORT_AUTH_EXPIRES_TIME: Joi.string().default('10s').description('passport auth expires time'),
    WEB_CLIENT_URL: Joi.string().required().description('frontend web url'),
    MAIL_VERIFY_TOKEN_SECRET: Joi.string().required().description('Mail verify token secret'),
    MAIL_VERIFY_TOKEN_EXPIRE: Joi.string().default('10m').description('Mail verify token expires'),
    CORS_WHITELIST: Joi.string().default('*').description('Cors whitelist'),
    SENTRY_DNS_URL: Joi.string().uri().required().description('sentry dns url'),
    TRIAL_DAYS: Joi.number().default(7).description('Trial days'),
    TRIAL_WORDS: Joi.number().default(700).description('Trial words'),
    IGNORE_CONTENT_SAVING_EMAIL: Joi.string().allow('').default('').description('Ignore content saving email'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  passportConfig: {
    authSecretKey: envVars.PASSPORT_SECRET_JWT_KEY,
    authExpireTime: envVars.PASSPORT_AUTH_EXPIRES_TIME,
  },
  googleOauth2: {
    clientId: envVars.GOOGLE_OAUTH2_CLIENT_ID,
    secretId: envVars.GOOGLE_OAUTH2_SECRET_ID,
  },
  facebookOauth: {
    appId: envVars.FACEBOOK_APP_ID,
    appSecret: envVars.FACEBOOK_APP_SECRET,
  },
  openAI: {
    openAIAPIKey: envVars.OPENAI_API_KEY,
  },
  stripe: {
    stripeSecretKey: envVars.STRIPE_SECRET_KEY,
    webHookSecretKey: envVars.STRIPE_WEBHOOK_SECRET_KEY,
  },
  verifyMail: {
    jwtSecret: envVars.MAIL_VERIFY_TOKEN_SECRET,
    jwtExpires: envVars.MAIL_VERIFY_TOKEN_EXPIRE,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  frontendUrl: {
    web: envVars.WEB_CLIENT_URL,
  },
  cors: {
    whitelist: envVars.CORS_WHITELIST.split(','),
  },
  sentry: {
    dns: envVars.SENTRY_DNS_URL,
  },
  trial: {
    days: envVars.TRIAL_DAYS,
    words: envVars.TRIAL_WORDS,
  },
  content: {
    ignoresavingdb: envVars.IGNORE_CONTENT_SAVING_EMAIL.split(','),
  },
};
