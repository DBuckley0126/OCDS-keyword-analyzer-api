/* eslint-disable no-restricted-syntax */
const urlManager = require("./urlManager");
const ldaManager = require("./ldaManager");
const errorManager = require("./errorManager");
const sources = require("../../lib/sourceUrls.json");

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
        debugger;
        if (response.data.message) {
          throw new Error(response.data.message);
        } else {
          throw new Error("ERROR: Source URL unavailable");
        }
      }

      const outputArray = [];

      for (contract of response.data.results) {
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
    } catch (err) {
      err.code = "RESPONSE_ERROR";
      errorManager.handleError(err);

      const errorMessage = () => {
        if (err.response) {
          return `Response from service: ${err.response.data.message}`;
        }
        if (err.request) {
          return `No response received from service: ${service}`;
        }
        return err.message;
      };

      return {
        success: false,
        output: [],
        message: errorMessage()
      };
    }
  }
};

module.exports = responseManager;
