const { assert } = require("chai");
const request = require("supertest");
const app = require("../index");
const database = require("../db_connection");

// rate-limited, so hit with care

describe("#gets a random photo from unsplash", () => {
  it("unsplash returns an image url", async () => {
    const response = await request(app)
      .get("/v1/photos/random")
      .expect(200);
    assert.include(response.body, "https://images.unsplash.com/photo");
  }).timeout(50000);
});

describe("#sends photo to AI and gets result", () => {
  it("sends to google", async () => {
    let body = {};
    body.photo =
      "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02";
    const JSONbodyToPost = JSON.stringify(body);
    const response = await request(app)
      .post("/v1/ai/google")
      .type("application/json")
      .send(JSONbodyToPost)
      .set("Accept", /application\/json/)
      .expect(200);
    assert.include(response.body, "cat");
  });

  it("sends to watson", async () => {
    let body = {};
    body.photo =
      "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02";
    const JSONbodyToPost = JSON.stringify(body);
    const response = await request(app)
      .post("/v1/ai/watson")
      .type("application/json")
      .send(JSONbodyToPost)
      .set("Accept", /application\/json/)
      .expect(200);
    assert.include(response.body, "cat");
  }).timeout(50000);

  it("sends to clarifai", async () => {
    let body = {};
    body.photo =
      "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02";
    const JSONbodyToPost = JSON.stringify(body);
    const response = await request(app)
      .post("/v1/ai/clarifai")
      .type("application/json")
      .send(JSONbodyToPost)
      .set("Accept", /application\/json/)
      .expect(200);
    assert.include(response.body, "cat");
  });
});
