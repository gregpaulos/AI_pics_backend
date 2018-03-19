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
    // rate-limited, so hit with care
    // describe("#random photo route", () => {
    //     it("unsplash returns an image url", done => {
    //         request(app)
    //             .get("/v1/photos/random")
    //             .expect(200)
    //             .then(response => {
    //                 assert.include(response.body, 'https://images.unsplash.com/photo');
    //             }).then(done).catch(done)
    //     });
    // });
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
});

