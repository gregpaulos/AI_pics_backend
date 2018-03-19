const {assert} = require("chai");
const request = require("supertest");
const app = require("../index");
const database = require("../db_connection");

describe("Photos route", () => {
    describe("#photo route index", () => {
        it("it up and runs", done => {
            request(app)
                .get("/v1/photos")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body, "photos route says hello!");
                }).then(done).catch(done);
        });
    });
    describe("#random photo route", () => {
        it("unsplash returns an image url", done => {
            request(app)
                .get("/v1/photos/random")
                .expect(200)
                .then(response => {
                    assert.include(response.body, 'https://images.unsplash.com/photo');
                }).then(done).catch(done)
        });
    });
    
});

