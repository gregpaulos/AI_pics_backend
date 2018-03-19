const { assert } = require("chai");
const request = require("supertest");
const app = require("../index");

describe("App is up", () => {
  describe("#index", () => {
    it("up and runs", done => {
      request(app)
        .get("/")
        .expect(200)
        .then(response => {
          assert.deepEqual(response.body, "index says hello!");
        })
        .then(done)
        .catch(done);
    });
  });
});

