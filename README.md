<a name="readme-top"></a>

<!--
*** Thanks for checking out CopywriterProAI. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div align="center">
  <a href="https://github.com/CopywriterPro-ai/copywriterproai-backend/graphs/contributors"><img src="https://img.shields.io/github/contributors/CopywriterPro-ai/copywriterproai-backend?style=for-the-badge&color=blue" alt="Contributors"></a>
  <a href="https://github.com/CopywriterPro-ai/copywriterproai-backend/network/members"><img src="https://img.shields.io/github/forks/CopywriterPro-ai/copywriterproai-backend?style=for-the-badge&color=blue" alt="Forks"></a>
  <a href="https://github.com/CopywriterPro-ai/copywriterproai-backend/stargazers"><img src="https://img.shields.io/github/stars/CopywriterPro-ai/copywriterproai-backend?style=for-the-badge&color=blue" alt="Stargazers"></a>
  <a href="https://github.com/CopywriterPro-ai/copywriterproai-backend/issues"><img src="https://img.shields.io/github/issues/CopywriterPro-ai/copywriterproai-backend?style=for-the-badge&color=blue" alt="Issues"></a>
  <a href="https://github.com/CopywriterPro-ai/copywriterproai-backend/blob/main/LICENSE"><img src="https://img.shields.io/github/license/CopywriterPro-ai/copywriterproai-backend?style=for-the-badge&color=blue" alt="Apache-2.0 License"></a>
  <br/>
  <a href="https://discord.gg/qKu3qA8M"><img src="https://img.shields.io/badge/Discord-Join%20Us-purple?logo=discord&logoColor=white&style=for-the-badge" alt="Join our Discord community"></a>
</div>

<!-- PROJECT LOGO -->
<div align="center">
  <h1 align="center">CopywriterProAI: World's first open-source AI writing platform for SEO and Ad Copy</h1>
  <a href="https://copywriterpro-ai.github.io/CopywriterProAI/"><img src="https://img.shields.io/badge/Documentation-CopywriterProAI-blue?logo=googledocs&logoColor=white&style=for-the-badge" alt="Check out the documentation"></a>
</div>
<hr>

Welcome to the backend repository of CopywriterProAI, the world's first open-source AI writing platform for SEO and Ad Copy. The backend of CopywriterProAI powers the AI capabilities and manages the processing of your content, ensuring smooth and efficient operation. It's like having your very own AI writing assistant working behind the scenes, always ready to lend a helping hand.


## ⚡ Getting Started

### Requirements

- Node v12.0+
- Yarn
- MongoDB Database


#### Install dependencies:

```bash
yarn
```

Set environment variables:
Copy from .env.example file and add new environment variables:

```bash
.env
```

# Frontend environment variables
```bash
PORT=8080

# MONGODB Database configuration
MONGODB_URL=mongodb://127.0.0.1:27017/copywriterpro

# JWT secret key
JWT_SECRET=23uF$%gdfh43@kDj#6Yf8sV4kL@Z9m#N7bS^Yhd9
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=15
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=1000

# WORD LIMIT
PACKAGES=FREEMIUM,BASIC_1MONTH,BASIC_6MONTH,STANDARD_1MONTH,STANDARD_6MONTH,PROFESSIONAL_1MONTH,PROFESSIONAL_6MONTH
INPUT_CHARACTER_RATE=1,1,1,2,2,4,4

# COPYSCAPE
COPYSCAPE_USERNAME=randomUser123
COPYSCAPE_API_KEY=randomAPIKey12345
PLAGIARISM_CHECKER_ALLOWED_PACKAGES=FREEMIUM,BASIC_1MONTH

# Google oauth2 client id
GOOGLE_OAUTH2_CLIENT_ID=352363168566-random-client-id-12345.apps.googleusercontent.com

# Google oauth2 secret id
GOOGLE_OAUTH2_SECRET_ID=randomSecretId12345

# Passport secret jwt key
PASSPORT_SECRET_JWT_KEY=randomPassportSecretKey12345

# Passport auth expires time
PASSPORT_AUTH_EXPIRES_TIME=1h

# Facebook app id
FACEBOOK_APP_ID=1234567890123456

# Facebook app secret
FACEBOOK_APP_SECRET=randomFacebookAppSecret12345

# STRIPE
STRIPE_SECRET_KEY=sk_test_randomStripeSecretKey12345
STRIPE_WEBHOOK_SECRET_KEY=whsec_randomStripeWebhookKey12345

# SMTP configuration options for the email service
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=465
SMTP_USERNAME=randomSMTPUsername12345
SMTP_PASSWORD=randomSMTPPassword12345
EMAIL_FROM=noreply@copywriterpro.ai

# OpenApi
OPENAI_API_KEY=sk-proj-randomOpenApiKey12345

# Web Client URL
WEB_CLIENT_URL=http://localhost:3000

# Mail token verify
MAIL_VERIFY_TOKEN_SECRET=randomMailVerifyTokenSecret12345
MAIL_VERIFY_TOKEN_EXPIRE=10m

# Cors Whitelist
CORS_WHITELIST=https://example.com,https://example2.com,http://localhost:3000,http://localhost:5000

# Sentry dns URL
SENTRY_DNS_URL=https://randomSentryDnsUrl@o737236.ingest.sentry.io/5791435

```

Running Locally

```bash
yarn dev
```
Running in Production

```bash

yarn start
```

## 🚀 Documentation

To learn more about the project, and for tips on using CopywriterProAI, check out our documentation.

There you'll find resources on how to use different LLM providers, troubleshooting resources, and advanced configuration options.

## 🤝 How to Contribute

CopywriterProAI is a community-driven project, and we welcome contributions from everyone. Whether you're a developer, a researcher, or simply enthusiastic about advancing the field of content creation with AI, there are many ways to get involved:

- **Code Contributions**: Help us develop new features, improve the UI, or optimize the backend.
- **Research and Evaluation**: Contribute to our understanding of AI in content creation, participate in evaluating models, or suggest improvements.
- **Feedback and Testing**: Use CopywriterProAI, report bugs, suggest features, or provide feedback on usability.

For details, please check [CONTRIBUTING.md](CONTRIBUTING.md).

## 🤖 Join Our Community

Whether you're a developer, a researcher, or simply enthusiastic about CopywriterProAI, we'd love to have you in our community. Let's make content creation better together!

- [Discord server](https://discord.gg/qKu3qA8M) - This is a community-run server for general discussion, questions, and feedback.
