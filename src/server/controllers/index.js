const responseManager = require("../../managers/responseManager");
const sources = require("../../../lib/sourceUrls.json");

module.exports = {
  index: async ctx => {
    ctx.body = {
      status: "success",
      message: "Welcome to the OCDS keyword analyzer!"
    };
  },
  getKeywords: async ctx => {
    if (sources.find(source => source.name === ctx.params.service)) {
      const response = await responseManager.keywords(ctx.params.service);
      if (response.success) {
        ctx.body = {
          service: ctx.params.service,
          search: false,
          message: response.message,
          data: {
            contracts: response.output.contracts,
            rejectedKeywords: response.output.rejectedKeywords
          }
        };
      } else {
        ctx.throw(404, response.message);
      }
    } else {
      ctx.throw(404, `Unable to find specified service: ${ctx.params.service}`);
    }
  },
  getKeywordsWithSearch: async ctx => {
    if (sources.find(source => source.name === ctx.params.service)) {
      const response = await responseManager.keywords(
        ctx.params.service,
        ctx.querystring
      );
      if (response.success) {
        ctx.body = {
          service: ctx.params.service,
          search: false,
          message: response.message,
          data: {
            contracts: response.output.contracts,
            rejectedKeywords: response.output.rejectedKeywords
          }
        };
      } else {
        ctx.throw(404, response.message);
      }
    } else {
      ctx.throw(404, `Unable to find specified service: ${ctx.params.service}`);
    }
  }
};
