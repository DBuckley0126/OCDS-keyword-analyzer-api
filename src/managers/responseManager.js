/* eslint-disable no-restricted-syntax */
const urlManager = require("./urlManager");
const ldaManager = require("./ldaManager");
const sources = require("../../lib/sourceUrls.json");

const responseManager = {
  keywords: async (service, search = false) => {
    const source = sources.find(source => source.name === service);
    if (search) {
      // DO SOMETHING
    } else {
      var json = await urlManager.fetch(source.urls.normalSearch);
    }

    const outputArray = [];
    for (contract of json.data.results) {
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

        primaryKeywords: [
          ldaManager.getTopicWords([
            contract.releases[0].tender.items[0].classification.description ||
              ""
          ]),
          ldaManager.getTopicWords([contract.releases[0].tender.title || ""])
        ]
          .flat()
          .filter((a, b, array) => array.indexOf(a) === b),

        secondaryKeywords: [
          ldaManager.getTopicWords(
            [contract.releases[0].tender.description || ""],
            1,
            3
          )
        ]
          .flat()
          .filter((a, b, array) => array.indexOf(a) === b)
      });
    }
    return {
      success: true,
      output: outputArray,
      message: "Successfully retreived source"
    };
  }
};

module.exports = responseManager;
