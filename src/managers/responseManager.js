/* eslint-disable no-restricted-syntax */
const urlManager = require("./urlManager");
const ldaManager = require("./ldaManager");

const responseManager = {
  keywords: async () => {
    const json = await urlManager.fetch(
      "https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search"
    );
    const outputArray = [];
    for (contract of json.data.results) {
      output.push({
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
    return outputArray;
  }
};

module.exports = responseManager;
