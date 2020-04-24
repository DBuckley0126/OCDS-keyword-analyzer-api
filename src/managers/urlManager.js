const axios = require('axios');


const urlManager = {
  fetch: async URL => {
    try {
      return await axios.get(URL)
    } catch(err) {
      errorManager.handleError(err)
    }
  }
}


module.exports = urlManager