module.exports = {
  emailMarketingCampaignSubject: {
    task: 'email-marketing-campaign-subject',
    productDescription: {
      min: 10,
      max: 300,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  emailMarketingCampaignBody: {
    task: 'email-marketing-campaign-body',
    productDescription: {
      min: 10,
      max: 200,
    },
    about: {
      min: 10,
      max: 150,
    },
    subjectLine: {
      min: 5,
      max: 60,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  emailBody: {
    task: 'email-body',
    about: {
      min: 10,
      max: 150,
    },
    to: {
      min: 5,
      max: 30,
    },
    tone: [
      'Formal',
      'Friendly',
      'Neutral',
      'Confident',
      'Curious',
      'Surprised',
      'Happy',
      'Angry',
      'Sad',
      'Concerned',
      'Encouraging',
      'Regretful',
      'Optimistic',
      'Excited',
      'Witty',
      'Persuasive',
      'Empathetic'
    ],
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  generatedSubjectFromBody: {
    task: 'email-subject-from-body',
    emailBody: {
      min: 10,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },
};
