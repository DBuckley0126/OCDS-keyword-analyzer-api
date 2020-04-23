module.exports = {
  index: async ctx => {
    ctx.body = {
      status: "success",
      message: "hello, world!"
    };
  }
};
