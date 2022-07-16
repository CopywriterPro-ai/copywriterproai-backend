module.exports = {
  shortBlog: {
    task: 'short-blog',
    about: {
      min: 10,
      max: 400,
      variable: true,
    },
    headline: {
      min: 10,
      max: 150,
    },
    keywords: {
      min: 0,
      max: 2,
    },
  },

  longBlog: {
    task: 'long-blog',
    about: {
      min: 10,
      max: 400,
      variable: true,
    },
    headline: {
      min: 10,
      max: 150,
    },
    keywords: {
      min: 0,
      max: 4,
    },
    contents: {
      min: 10,
      max: 12000,
    },
  },

  blogFromOutline: {
    task: 'blog-from-outline',
    headline: {
      min: 10,
      max: 150,
    },
    intro: {
      min: 10,
      max: 1000,
    },
    outline: {
      min: 3,
      max: 10,
    },
  },

  blogIdea: {
    task: 'blog-idea',
    productName: {
      min: 3,
      max: 50,
    },
    productDescription: {
      min: 10,
      max: 300,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  blogHeadline: {
    task: 'blog-headline',
    about: {
      min: 10,
      max: 200,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  blogIntro: {
    task: 'blog-intro',
    about: {
      min: 10,
      max: 200,
    },
    headline: {
      min: 10,
      max: 150,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  blogOutline: {
    task: 'blog-outline',
    about: {
      min: 10,
      max: 200,
    },
    headline: {
      min: 10,
      max: 150,
    },
    numberOfPoints: {
      min: 3,
      max: 10,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  blogTopic: {
    task: 'blog-topic',
    about: {
      min: 10,
      max: 200,
    },
    headline: {
      min: 10,
      max: 150,
    },
    userText: {
      min: 10,
      max: 500,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  blogOutro: {
    task: 'blog-outro',
    about: {
      min: 10,
      max: 200,
    },
    headline: {
      min: 10,
      max: 150,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },
};