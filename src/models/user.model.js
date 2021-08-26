const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { subscription, trial } = require('../config/plan');
const { authTypes } = require('../config/auths');

const authTypeEnum = Object.values(authTypes);
const subscriptionEnum = Object.values(subscription);

const userSchema = new Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    authType: {
      type: String,
      enum: authTypeEnum,
    },
    profileAvatar: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
      // minlength: 8,
      // validate(value) {
      //   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      //     throw new Error('Password must contain at least one letter and one number');
      //   }
      // },
      private: true, // used by the toJSON plugin
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    credits: {
      type: Number,
      trim: true,
      default: 700,
    },
    dailyCreaditUsage: {
      date: { type: Date },
      usage: { type: Number, default: 0 },
    },
    subscription: {
      type: String,
      enum: subscriptionEnum,
      default: subscription.FREEMIUM,
    },
    favouriteTools: {
      type: Array,
      required: true,
      default: [],
    },
    copycounter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isVerifiedEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, isVerified: true, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.virtual('freeTrial').get(function () {
  const subs = this.subscription;
  const dailyUsage = this.dailyCreaditUsage;
  const addSevenDays = moment(this.createdAt).add('7', 'days');

  if (subs === subscription.FREEMIUM && moment().isSameOrBefore(addSevenDays)) {
    return { eligible: true, dailyLimitExceeded: dailyUsage.usage === trial.dailyLimit };
  }
  return { eligible: false, dailyLimitExceeded: true };
});

userSchema.virtual('getUserCurrentSubscription').get(function () {
  return this.subscription;
});

/**
 * @typedef User
 */
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
