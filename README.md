# copywriter-backend

## Requirements

- [Node v12.0+](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- MongoDB Database


#### Install dependencies:

```bash
yarn
```

#### Set environment variables:

- copy from .env.example file and add new environment

```bash
PORT=5500

# MONGODB Database configuration
MONGODB_URL=mongodb://127.0.0.1:27017/copywriter-db

# JWT secret key
JWT_SECRET=supersecuresecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30


# SMTP configuration options for the email service
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com

```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```
