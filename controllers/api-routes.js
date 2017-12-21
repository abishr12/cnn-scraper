// Requiring our models
var db = require("../models/index.js");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  // A GET route for scraping the cnn website
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("https://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      console.log(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        console.log(result);

        // // Create a new Article using the `result` object built from scraping
        // db.Article.create(result)
        //   .then(function(dbArticle) {
        //     // If we were able to successfully scrape and save an Article, send a message to the client
        //     res.send("Scrape Complete");
        //   })
        //   .catch(function(err) {
        //     // If an error occurred, send it to the client
        //     res.json(err);
        //   });
      });
    });
  });
};
