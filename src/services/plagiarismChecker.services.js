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

/**
 * To test plagiarism api
 */

// const testData = {
//   "status": 200,
//   "results": {
//     "response": {
//       "querywords": 38,
//       "cost": 0.03,
//       "count": 10,
//       "result": [
//         {
//           "index": 1,
//           "url": "https://www.facebook.com/SouthAsianMonitorCom/posts/3125497574433420",
//           "title": "Let's start with the issue of... - South Asian Monitor ...",
//           "textsnippet": "... Trade tensions, a pandemic, supply-chain snarls, inflation and war have together dealt them serious blows. Over the past three years more than half the population of the emerging world lived in countries where income growth, on a purchasing-power-parity basis, lagged behind that in America—the first such episode since the 1980s. See more",
//           "htmlsnippet": "<font color=\"#777777\">... Trade tensions, a pandemic, supply-chain snarls, inflation and war have together dealt them serious blows. </font><font color=\"#000000\">Over the past three years more than half the population of the emerging world lived in countries where income growth, on a purchasing-power-parity basis, lagged behind that in America—the first such episode since the 1980s. </font><font color=\"#777777\">See more</font>",
//           "minwordsmatched": 38,
//           "viewurl": "http://view2.copyscape.com/compare/ra79j8zul3/1"
//         }
//       ],
//       "allviewurl": "http://view2.copyscape.com/search/ra79j8zul3"
//     }
//   }
// };

const searchContent = async (text) => {
  text = removeSpaces(text);

  if (text.split(' ').length < 15) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You must have at least 15 words.');
  }

  params.text = text;

  // const response = testData;

  const response = await copyscape.searchFromText(params);

  const copiedTextsInformations = await getTextSnippets(response);
  const result = await getRanges(text, copiedTextsInformations);
  return result;
};

module.exports = {
  searchContent,
};
