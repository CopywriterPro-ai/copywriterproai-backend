// const countWords = (text, flag) {
//   var $this = this;
//   var words = this.wordsOfText(text);
//   var words_count;
//   this.uniqueWords = [];
//   if (this.optionsObject.details['unique_word_count']) {
//       if (Array.isArray(words)) {
//           $this.uniqueWords = $this.uniqueArray(words);
//       }
//   }
//   words_count = words !== null ? words.length : 0;
//   if (flag) {
//       this.count_for_selection['word_count'] = words_count;
//   } else {
//       this.count['word_count'] = words_count;
//   }
// }

const wordsOfText = (text) => {
  let words;
  const textWithoutSpace = text.replace(/\s+/g, '');
  const matches = textWithoutSpace.match(/([^\x00-\x7F\u2013\u2014])+/gi);
  const latinOnly = matches === null;
  if (!latinOnly) {
    words = text.match(/\S+/g);
  } else {
    words = text
      .replace(/[;!:\-—\/]/g, ' ')
      .replace(/\.\s+/g, ' ')
      .replace(/[^a-zA-Z\d\s&:,]/g, '')
      .replace(/,([^0-9])/g, ' $1')
      .match(/\S+/g);
  }
  return words;
};

const numberOfWords = (text) => {
  return wordsOfText(text).length;
}

module.exports = {
  numberOfWords,
};