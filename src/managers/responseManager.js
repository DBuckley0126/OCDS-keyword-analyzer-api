/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const urlManager = require("./urlManager");
const ldaManager = require("./ldaManager");
const errorManager = require("./errorManager");
const sources = require("../../lib/sourceUrls.json");

const rejectedKeywords = [];

const keywordComplier = topicArray => {
  const outputArray = [];
  for (const topicObject of topicArray) {
    let response = null;
    if ("arguments" in topicObject) {
      response = ldaManager.getTopicWords(
        [topicObject.topic],
        ...topicObject.arguments
      );
      rejectedKeywords.push(response.rejected);
      outputArray.push(response.output);
    } else {
      response = ldaManager.getTopicWords([topicObject.topic]);
      rejectedKeywords.push(response.rejected);
      outputArray.push(response.output);
    }
  }
  return outputArray.flat().filter((a, b, array) => array.indexOf(a) === b);
};

const responseManager = {
  keywords: async (service, search = false) => {
    const foundSource = sources.find(source => source.name === service);
    let response = {};
    try {
      if (search) {
        response = await urlManager.fetch(
          `${foundSource.urls.normalSearch}?${search}`
        );
      } else {
        response = await urlManager.fetch(foundSource.urls.normalSearch);
      }

      if (response.status !== 200) {
        if (response.data.message) {
          throw new Error(response.data.message);
        } else {
          throw new Error("ERROR: Source URL unavailable");
        }
      }

      const outputArray = [];

      for (const contract of response.data.results) {
        outputArray.push({
          ocid: contract.releases[0].ocid || "Unavailable",

          uri: contract.uri || "Unavailable",

          title:
            contract.releases[0].tender.title.replace(/\b&#.{0,3};\b/g, "") ||
            "Unavailable",

          description:
            contract.releases[0].tender.description.replace(
              /\b&#.{0,3};\b/g,
              ""
            ) || "Unavailable",

          primaryKeywords: keywordComplier([
            {
              topic:
                contract.releases[0].tender.items[0].classification
                  .description || ""
            },
            { topic: contract.releases[0].tender.title || "" }
          ]),

          secondaryKeywords: keywordComplier([
            {
              topic: contract.releases[0].tender.description || "",
              arguments: [1, 3]
            }
          ])
        });
      }

      return {
        success: true,
        output: {
          contracts: outputArray,
          rejectedKeywords: rejectedKeywords
            .flat()
            .filter((a, b, array) => array.indexOf(a) === b)
        },
        message: "Successfully retreived source"
      };
    } catch (err) {
      err.code = "RESPONSE_ERROR";
      errorManager.handleError(err);

      return {
        success: false,
        output: [],
        message: errorManager.humanErrorMessageCompiler(err, service)
      };
    }
  }
};

module.exports = responseManager;
