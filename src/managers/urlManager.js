const axios = require("axios");
const errorManager = require("./errorManager");

const urlManager = {
  fetch: async URL => {
    try {
      return await axios.get(URL);
    } catch (err) {
      errorManager.handleError(err);
    }
  }
};

module.exports = urlManager;
