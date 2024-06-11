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

const findCommon = (str1 = '', str2 = '') => {
   const s1 = [...str1];
   const s2 = [...str2];
   const arr = Array(s2.length + 1).fill(null).map(() => {
      return Array(s1.length + 1).fill(null);
   });
   for (let j = 0; j <= s1.length; j += 1) {
      arr[0][j] = 0;
   }
   for (let i = 0; i <= s2.length; i += 1) {
      arr[i][0] = 0;
   }
   let len = 0;
   let col = 0;
   let row = 0;
   for (let i = 1; i <= s2.length; i += 1) {
      for (let j = 1; j <= s1.length; j += 1) {
         if (s1[j - 1] === s2[i - 1]) {
            arr[i][j] = arr[i - 1][j - 1] + 1;
         }
         else {
            arr[i][j] = 0;
         }
         if (arr[i][j] > len) {
            len = arr[i][j];
            col = j;
            row = i;
         }
      }
   }
   if (len === 0) {
      return '';
   }
   let res = '';
   while (arr[row][col] > 0) {
      res = s1[col - 1] + res;
      row -= 1;
      col -= 1;
   }
   return res;
};

const getTextSnippets = async ({ response }, text) => {
  if (!response?.count) {
    return [];
  }

  const results = response?.result;
  let textsnippets = new Map();

  for (result of results) {
    const htmlText = result.htmlsnippet;
    const copiedText = htmlText.match(/<font color="#000000">(.*?)<\/font>/g).map(function (val) {
      return val.replace(/<font color="#000000">|<\/font>/g, '').trim();
    })[0];

    const commonString = findCommon(text, copiedText);
    // const commonString = copiedText;

    textsnippets.has(commonString) ? true : textsnippets.set(commonString, { sources: [] });
    const sources = textsnippets.get(commonString).sources;

    textsnippets.set(commonString, {
      wordsMatched: result.minwordsmatched,
      sources: [...sources, result.url],
    });
  }

  textsnippets = Array.from(textsnippets, ([text, source]) => ({ text, source }));
  return textsnippets;
};

const getRanges = async (text, copiedTextsInformations) => {
  let ranges = [];
  for (info of copiedTextsInformations) {
    // let indexes = [];
    let start = 0, from = 0;

    while (~(start = text.indexOf(info.text, from))) {
      // indexes.push([start, start + info.text.length]);
      ranges.push([start, start + info.text.length]);
      from = start + info.text.length;
    }
    // info.ranges = indexes;
  }

  return ranges;
};

/**
 * To test plagiarism api
 */

// const testData = {
//   response: {
//     querywords: 38,
//     cost: 0.03,
//     count: 10,
//     result: [
//       {
//         index: 1,
//         url: 'https://www.facebook.com/SouthAsianMonitorCom/posts/3125497574433420',
//         title: "Let's start with the issue of... - South Asian Monitor ...",
//         textsnippet:
//           '... Trade tensions, a pandemic, supply-chain snarls, inflation and war have together dealt them serious blows. Over the past three years more than half the population of the emerging world lived in countries where income growth, on a purchasing-power-parity basis, lagged behind that in America—the first such episode since the 1980s. See more',
//         htmlsnippet:
//           '<font color="#777777">... Trade tensions, a pandemic, supply-chain snarls, inflation and war have together dealt them serious blows. </font><font color="#000000">Over the past three years more than half the population of the emerging world lived in countries where income growth, on a purchasing-power-parity basis, lagged behind that in America—the first such episode since the 1980s. </font><font color="#777777">See more</font>',
//         minwordsmatched: 38,
//         viewurl: 'http://view2.copyscape.com/compare/ra79j8zul3/1',
//       },
//     ],
//     allviewurl: 'http://view2.copyscape.com/search/ra79j8zul3',
//   },
// };

// const testData = {
//   "response": {
//       "querywords": 15,
//       "cost": 0.03,
//       "count": 8,
//       "result": [
//           {
//               "index": 1,
//               "url": "https://siliconvalleyjournals.com/startup/google-llc/",
//               "title": "Google LLC - Company Profile, Revenue & Funding",
//               "textsnippet": "... Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing,",
//               "htmlsnippet": "<font color=\"#777777\">... </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, </font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/1"
//           },
//           {
//               "index": 2,
//               "url": "https://kalicube.pro/brand-serps",
//               "title": "Knowledge Panel and Brand SERP Checker - Kalicube Tracks Over ...",
//               "textsnippet": "... Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, .",
//               "htmlsnippet": "<font color=\"#777777\">... </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, computer software, .</font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/2"
//           },
//           {
//               "index": 3,
//               "url": "https://alexaanswers.amazon.com/question/1knadCW6xPCHszsOvwFNIS/ref=cbqa_pqd_sim_q",
//               "title": "What who is google? - Alexa Answers",
//               "textsnippet": "... Jan 9, 2023 – Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing,",
//               "htmlsnippet": "<font color=\"#777777\">... Jan 9, 2023 – </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, </font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/3"
//           },
//           {
//               "index": 4,
//               "url": "https://www.youtube.com/watch?v=HHh5JaY89Gw",
//               "title": "the man ???? lol???? - YouTube",
//               "textsnippet": "... Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial",
//               "htmlsnippet": "<font color=\"#777777\">... </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, computer software, quantum computing, e-commerce, artificial</font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/4"
//           },
//           {
//               "index": 5,
//               "url": "https://en.wikipedia.org/wiki/Google",
//               "title": "Google - Wikipedia",
//               "textsnippet": "... Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software,",
//               "htmlsnippet": "<font color=\"#777777\">... </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, computer software, </font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/5"
//           },
//           {
//               "index": 6,
//               "url": "https://my.jobrapido.com/jobpreview/17467564",
//               "title": "Country Manager, Google Cloud - Kuala Lumpur | Jobrapido.com",
//               "textsnippet": "... Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. Employment Type . Full-time . Job Location . Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
//               "htmlsnippet": "<font color=\"#777777\">... </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. Employment Type . Full-time . Job Location . Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia</font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/6"
//           },
//           {
//               "index": 7,
//               "url": "https://www.instagram.com/p/ClYkE4MD80R/",
//               "title": "Watch this reel by jobs.for.engineers on Instagram",
//               "textsnippet": "... Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. C salary- 14 LPA 2. HP HP Inc. is an American multinational information technology company headquartered in Palo Alto,",
//               "htmlsnippet": "<font color=\"#777777\">... </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. C salary- 14 LPA 2. HP HP Inc. is an American multinational information technology company headquartered in Palo Alto,</font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/7"
//           },
//           {
//               "index": 8,
//               "url": "https://research.noticebard.com/general/student-researcher-program-2023-at-google-bangalore/",
//               "title": "Student Researcher Program 2023 at Google",
//               "textsnippet": "... Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. About the Program. The Student Researcher Program's primary objective is to foster academic collaborations with students through research at Google. The",
//               "htmlsnippet": "<font color=\"#777777\">... </font><font color=\"#000000\">Google LLC is an American multinational technology company focusing on search engine technology, online advertising, </font><font color=\"#777777\">cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. About the Program. The Student Researcher Program's primary objective is to foster academic collaborations with students through research at Google. The </font>",
//               "minwordsmatched": 15,
//               "viewurl": "http://view2.copyscape.com/compare/2bqt6vdv5w/8"
//           },
//           {
//               index: 9,
//               url: 'https://www.facebook.com/SouthAsianMonitorCom/posts/3125497574433420',
//               title: "Let's start with the issue of... - South Asian Monitor ...",
//               textsnippet:
//                 '... Trade tensions, a pandemic, supply-chain snarls, inflation and war have together dealt them serious blows. Over the past three years more than half the population of the emerging world lived in countries where income growth, on a purchasing-power-parity basis, lagged behind that in America—the first such episode since the 1980s. See more',
//               htmlsnippet:
//                 '<font color="#777777">... Trade tensions, a pandemic, supply-chain snarls, inflation and war have together dealt them serious blows. </font><font color="#000000">Over the past three years more than half the population of the emerging world lived in countries where income growth, on a purchasing-power-parity basis, lagged behind that in America—the first such episode since the 1980s. </font><font color="#777777">See more</font>',
//               minwordsmatched: 38,
//               viewurl: 'http://view2.copyscape.com/compare/ra79j8zul3/1',
//           },
//       ],
//       "allviewurl": "http://view2.copyscape.com/search/2bqt6vdv5w"
//   }
// };

const searchContent = async (text) => {
  text = removeSpaces(text);

  if (text.split(' ').length < 15) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You must have at least 15 words.');
  }

  params.text = text;

  // const response = testData;
  let result;

  try {
    const response = await copyscape.searchFromText(params);
    // const response = testData;

    const copiedTextsInformations = await getTextSnippets(response, text);
    result = await getRanges(text, copiedTextsInformations);
  } catch {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong!');
  }
  return result;
};

module.exports = {
  searchContent,
};
