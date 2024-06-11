module.exports = {
  youtubeVideoTitleFromDescription: {
    task: 'youtube-video-titles-from-description',
    description: {
      min: 10,
      max: 300,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  youtubeVideoIdeas: {
    task: 'youtube-video-ideas',
    topic: {
      min: 5,
      max: 200,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  youtubeVideoScript: {
    task: 'youtube-video-script',
    title: {
      min: 5,
      max: 400,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  videoTagsFromDescription: {
    task: 'youtube-video-tags-from-description',
    primaryText: {
      min: 10,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  channelTagsFromDescription: {
    task: 'youtube-channel-tags-from-description',
    primaryText: {
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
