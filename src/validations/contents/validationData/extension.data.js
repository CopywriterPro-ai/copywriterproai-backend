module.exports = {
  paraphrase: {
    task: 'paraphrasing',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
  },

  simplifier: {
    task: 'simplifier',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
  },

  summarizer: {
    task: 'summarizer',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
  },

  grammarFixer: {
    task: 'grammar-fixer',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
  },

  changeTone: {
    task: 'change-tone',
    userText: {
      min: 5,
      max: 400,
      variable: true,
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
      'Empathetic',
    ],
  },
};
