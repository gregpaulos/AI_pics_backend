const {assert} = require("chai");
const request = require("supertest");
const app = require("../index");
const database = require("../db_connection");


describe("Photos route", () => {
    describe("#photo route index", () => {
        it("it returns a list of all photos", done => {
            request(app)
                .get("/v1/photos")
                .expect(200)
                .then(response => {
                    let results = response.body.results
                    assert.include(results[0].photo_url, "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02");
                    assert.isAtLeast(results.length, 1);
                }).then(done).catch(done);
        });
    });
    describe("#photo id route", () => {
        it("returns image from db by id", done => {
            request(app)
                .get("/v1/photos/1")
                .expect(200)
                .then(response => {
                    assert.include(response.body.results[0].photo_url, "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02")
                }).then(done).catch(done)
        });
    });
    describe("#photo id with description route", () => {
        it("returns image from db by id with the ai descriptions", done => {
            request(app)
                .get("/v1/photos/1/descriptions")
                .expect(200)
                .then(response => {
                    assert.equal(response.body.photo_and_description.google[0], "fell")
                }).then(done).catch(done)
        });
    });
    describe("#descriptions", () => {
        it("returns all descriptions from db", done => {
            request(app)
                .get("/v1/photos/descriptions")
                .expect(200)
                .then(response => {
                    let results = response.body.results
                    assert.include(results[0].description, "mountainous landforms");
                    assert.isAtLeast(results.length, 5);
 
                }).then(done).catch(done)
        });
    });
    describe("#descriptions specific ai provider", () => {
        it("returns all descriptions from db for a particular ai provider", done => {
            request(app)
                .get("/v1/photos/descriptions/google")
                .expect(200)
                .then(response => {
                    let results = response.body["photos_and_descriptions"]
                    assert.include(results["1"].google[0], "fell");
                }).then(done).catch(done)
        });
    });
 
});

