const copyscape = require('copyscape');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const { removeSpaces } = require('./content.service');

const { copyscapeUsername, copyscapeAPIKey } = config.copyscape;

const params = {
  user: copyscapeUsername,
  apiKey: copyscapeAPIKey,
  text: '',
};

const getTextSnippets = async ({ response }) => {
  if(!response?.count) {
    return [];
  }

  const results = response?.result;
  let textsnippets = new Map();

  for(result of results) {
    const text = result.htmlsnippet;
    const copiedText = text.match(/<font color="#000000">(.*?)<\/font>/g).map(function(val){
      return val.replace(/<font color="#000000">|<\/font>/g,'').trim();
    })[0];

    textsnippets.has(copiedText) ? true : textsnippets.set(copiedText, { sources: [] });
    const sources = textsnippets.get(copiedText).sources;
    
    textsnippets.set(copiedText, {
      wordsMatched: result.minwordsmatched,
      sources: [...sources, result.url],
    });
  }

  textsnippets = Array.from(textsnippets, ([text, source]) => ({ text, source }));
  return textsnippets;
}

const getRanges = async (text, copiedTextsInformations) => {
  for (info of copiedTextsInformations) {
    let indexes = [];
    let start = 0, from = 0;
    
    while(~(start = text.indexOf(info.text, from))) {
      indexes.push([start, start + info.text.length - 1]);
      from = start + info.text.length;
    }
    
    info.ranges = indexes;
  }

  return copiedTextsInformations;
}

const searchContent = async (text) => {
  text = removeSpaces(text);

  if (text.split(' ').length < 15) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You must have at least 15 words.');
  }

  params.text = text;

  const response = await copyscape.searchFromText(params);

  const copiedTextsInformations = await getTextSnippets(response);
  const result = await getRanges(text, copiedTextsInformations);
  return result;
};

module.exports = {
  searchContent,
};
