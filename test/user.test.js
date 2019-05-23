// eslint-disable-next-line
const should = require("chai").should();
const { app } = require("../index");
const request = require("supertest").agent(app.listen());

describe("User API", function() {
  it("Registered successfully.", function(done) {
    const user = {
      name: "Mafee",
      password: "123"
    };
    request
      .post("/register")
      .send(user)
      .expect(200)
      .end((error, res) => {
        res.body.code.should.equal(0);
        res.body.data.name.should.equal(user.name);
        done();
      });
  });

  it("Registered failed because of duplicate name.", function(done) {
    const user = {
      name: "Mafee",
      password: "123"
    };
    request
      .post("/register")
      .send(user)
      .expect(200)
      .end((error, res) => {
        res.body.code.should.equal(-1);
        res.body.msg.should.equal("User name exists!");
        done();
      });
  });
});
