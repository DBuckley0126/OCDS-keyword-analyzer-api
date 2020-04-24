const axios = require("axios");
const errorManager = require("./errorManager");

const urlManager = {
  fetch: async URL => {
    try {
      return axios.get(URL);
    } catch (err) {
      err.code = "REQUEST_ERROR";
      errorManager.handleError(err);
    }
  }
};

module.exports = urlManager;
