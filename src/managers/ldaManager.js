/* eslint-disable no-restricted-syntax */
const lda = require("lda");
const CheckWord = require("check-word");
const pluralize = require("pluralize");
const dictionary = require("../../lib/dictionary.json");
const errorManager = require("./errorManager");

const words = CheckWord("en");

const wordChecker = word => {
  switch (true) {
    case dictionary.blacklistWords.includes(word):
      return false;
    case dictionary.whitelistWords.includes(word):
      return true;
    case words.check(word):
      return true;
    default:
      return false;
  }
};

const ldaManager = {
  getTopicWords: (documentArray, amountOfTopics = 1, keywordsPerTopic = 2) => {
    const checkedDocumentArray = documentArray.map(string => {
      return string.replace(/\b&#.{0,3};\b/g, "");
    });
    let outputArray = [];
    const rejectedKeywords = [];
    try {
      let attempts = 0;
      while (
        outputArray.length < amountOfTopics * keywordsPerTopic &&
        attempts < 4
      ) {
        outputArray = [];
        const results = lda(
          checkedDocumentArray,
          amountOfTopics,
          keywordsPerTopic + attempts
        );

        for (const topic of results) {
          for (const keyword of topic) {
            const singularVersion = pluralize.singular(keyword.term);
            if (
              wordChecker(singularVersion) &&
              outputArray.length < amountOfTopics * keywordsPerTopic
            ) {
              outputArray.push(pluralize.singular(keyword.term));
            } else if (outputArray.length < amountOfTopics * keywordsPerTopic) {
              rejectedKeywords.push(singularVersion);
            }
          }
        }
        attempts += 1;
      }
    } catch (err) {
      err.code = "LDA_FAIL";
      errorManager.handleError(err);
    } finally {
      return { output: outputArray, rejected: rejectedKeywords };
    }
  }
};

module.exports = ldaManager;
