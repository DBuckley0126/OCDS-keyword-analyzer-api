module.exports = {
  index: async ctx => {
    ctx.body = {
      status: "success",
      message: "Welcome to the OCDS keyword analyzer!"
    };
  }

};
