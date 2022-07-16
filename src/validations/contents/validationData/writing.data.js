module.exports = {
  paraphrase: {
    task: 'paraphrasing',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  expander: {
    task: 'expander',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  simplifier: {
    task: 'simplifier',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  summarizer: {
    task: 'summarizer',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  abstractGenerator: {
    task: 'abstract',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  notesFromPassage: {
    task: 'notes-from-passage',
    userText: {
      min: 5,
      max: 400,
      variable: true,
    },
    numberOfPoints: {
      min: 2,
      max: 10,
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
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  activePassive: {
    task: 'active-passive',
    userText: {
      min: 5,
      max: 200,
      variable: true,
    },
    voice: ['Active', 'Passive'],
  },

  pointOfView: {
    task: 'point-of-view',
    userText: {
      min: 5,
      max: 200,
      variable: true,
    },
    person: ['first-person', 'second-person', 'third-person'],
    gender: ['male', 'female'],
  },
};
