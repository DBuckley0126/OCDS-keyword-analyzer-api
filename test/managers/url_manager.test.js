process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const urlManager = require("../../src/managers/urlManager");

chai.use(chaiAsPromised);
const { expect } = chai;

const attemptFetch = async test => {
  const res = await urlManager.fetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  switch (test) {
    case "status":
      return res.status;
    case "method":
      return res.config.method;
    default:
      return res;
  }
};

describe("managers : urlManager", () => {
  describe("fetch", () => {
    it("should fetch successfully from a API endpoint", done => {
      expect(attemptFetch("status"), "returned response should be sucessful")
        .to.eventually.equal(200)
        .notify(done);
    });
    it("should fetch with a GET method from a API endpoint", done => {
      expect(attemptFetch("method"), "request should use GET method")
        .to.eventually.equal("get")
        .notify(done);
    });
  });
});
