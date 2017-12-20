// Requiring our models
var db = require("../models/index.js");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });
};
