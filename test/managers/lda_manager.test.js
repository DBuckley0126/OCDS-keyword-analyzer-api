process.env.NODE_ENV = "test";
const chai = require("chai");
const ldaManager = require("../../src/managers/ldaManager");
const dictionary = require("../../lib/dictionary.json");

const { expect } = chai;

describe("managers : ldaManager", () => {
  describe("getTopicWords", () => {
    it("should identify keywords from a string", done => {
      expect(
        ldaManager.getTopicWords(["bye world, hello world"]),
        "output type should be type of array"
      ).to.be.a("array");
      expect(
        ldaManager.getTopicWords(["bye world, hello world"]).length,
        "rrray should have 2 elements"
      ).to.equal(2);
      expect(
        ldaManager.getTopicWords(["bye world, hello world"]).includes("bye"),
        "array should include 'bye'"
      ).to.equal(true);
      expect(
        ldaManager.getTopicWords(["bye world, hello world"]).includes("world"),
        "array should include 'world'"
      ).to.equal(true);
      done();
    });
    it("should identify the correct amount of keywords when given arguments", done => {
      expect(
        ldaManager.getTopicWords([
          "bye world, hello world, number of dogs on this world is a hundred"
        ]),
        "output type should be type of array"
      ).to.be.a("array");
      expect(
        ldaManager.getTopicWords([
          "bye world, hello world, number of dogs on this world is a hundred"
        ]).length,
        "array should have 2 elements when given no arguments"
      ).to.equal(2);
      expect(
        ldaManager.getTopicWords(
          ["bye world, hello world, number of dogs on this world is a hundred"],
          1,
          3
        ).length,
        "array should have 3 elements when given the argument 'keywordsPerTopic: 3'"
      ).to.equal(3);
      expect(
        ldaManager.getTopicWords(
          ["bye world, hello world, number of dogs on this world is a hundred"],
          2
        ).length,
        "array should have 4 elements when given the argument 'amountOfTopics = 2'"
      ).to.equal(4);
      done();
    });
    it("should identify the correct keywords when given a complex string", done => {
      expect(
        ldaManager
          .getTopicWords([
            "Open contracting means all data and documents are disclosed at all stages of the contracting process."
          ])
          .includes("contracting"),
        "array should include 'contracting'"
      ).to.equal(true);
      expect(
        ldaManager
          .getTopicWords([
            "Open contracting means all data and documents are disclosed at all stages of the contracting process."
          ])
          .includes("stage"),
        "array should include 'stage'"
      ).to.equal(true);
      expect(
        ldaManager
          .getTopicWords([
            "Open notaword means all data and documents notaword are disclosed at notaword all stages of the contracting process."
          ])
          .includes("notaword"),
        "array should not include 'notaword' as this is not a real word"
      ).to.equal(false);
      if (dictionary.whitelistWords[0]) {
        expect(
          ldaManager
            .getTopicWords([`${dictionary.whitelistWords[0]}`])
            .includes(dictionary.whitelistWords[0]),
          `array should include ${dictionary.whitelistWords[0]} as it is allowed by the whitelist`
        ).to.equal(true);
      } else {
        console.log("Warning: Unable to perform whitelist test");
      }
      if (dictionary.blacklistWords[0]) {
        expect(
          ldaManager
            .getTopicWords([`${dictionary.blacklistWords[0]}`])
            .includes(dictionary.blacklistWords[0]),
          `array should not include ${dictionary.blacklistWords[0]} as it is forbidden by the blacklist`
        ).to.equal(false);
      } else {
        console.log("Warning: Unable to perform blacklist test");
      }
      done();
    });
  });
});
