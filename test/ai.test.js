const { assert } = require("chai");
const request = require("supertest");
const app = require("../index");
const database = require("../db_connection");

// var url = "";

// // rate-limited, so hit with care
// describe("#gets a new photo, sends it to AI and gets result", () => {
//   it("unsplash returns an image url", done => {
//     request(app)
//       .get("/v1/photos/random")
//       .expect(200)
//       .then(response => {
//         url = response.body;
//         assert.include(response.body, "https://images.unsplash.com/photo");
//       })
//       .then(done)
//       .catch(done);
//   });
//   it("sends to clarifai", done => {
//     console.log("THIS IS THE URL", url);
//     let body = {};
//     body.photo = url;

//     let JSONbodyToPost = JSON.stringify(body);
//     console.log("ABOUT TO POST", JSONbodyToPost);
//     request(app)
//       .post("/v1/ai/clarifai")
//       .send(JSONbodyToPost)
//       .expect(200)
//       .then(response => {
//         assert.include(
//           response.body.results[0].photo_url,
//           "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02"
//         );
//       })
//       .then(done)
//       .catch(done);
//   });
// });


describe("#gets a new photo, sends it to AI and gets result", () => {
      it("sends to clarifai", async () => {
        
        let body = {};
        body.photo = "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02"    
        let JSONbodyToPost = JSON.stringify(body);
        console.log("ABOUT TO POST", JSONbodyToPost);
        var options = {
            method: "post",
            body: JSONbodyToPost,
            headers: { "Content-Type": "application/json" }
          }


        // const response = await request(app)
        // .post("/v1/ai/google", JSONbodyToPost)

// WORKED
        // request(app).post("/v1/ai/google")
        // .type("application/json")
        // .send(JSONbodyToPost)
        // .set('Accept', /application\/json/)
        // .expect(201)
        // .end(function (err, res) { done(); });


        const response = await request(app).post("/v1/ai/google")
        .type("application/json")
        .send(JSONbodyToPost)
        .set('Accept', /application\/json/)
        // .expect(200)
        // .then(response => {
        //     console.log(response);
            
        //             assert.include(
        //               response.body.results[0].photo_url,
        //               "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02"
        //             );
        //           })
        // .end(function (err, res) { done(); });

console.log(response.body);


        // const data = await response.json()

        // console.log(data.body);
        

        


        // const response = await fetch(url, {
        //     method: "post",
        //     body: JSONbodyToPost,
        //     headers: { "Content-Type": "application/json" }
        //   });
        //   const json = await response.json();
        //   return json;
        // }


        // request(app)
        //   .post("/v1/ai/clarifai")
        //   .send(JSONbodyToPost)
        //   .expect(200)
        //   .then(response => {
        //     assert.include(
        //       response.body.results[0].photo_url,
        //       "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02"
        //     );
        //   })
        //   .then(done)
        //   .catch(done);
      });
    });
    

