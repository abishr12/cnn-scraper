// Requiring our models
var db = require("../models/index.js");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // Grab every document in the Articles collection
    db.Article.find({})
      .limit(20)
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        var hbsObject = {
          article: dbArticle
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/empty", (req, res) => {
    db.Article.collection.drop().then(() => {
      res.send("DB Emptied");
    });
  });
  // A GET route for scraping the cnn website
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("https://www.nytimes.com/", function(error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);

      //console.log(response);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article").each(function(i, element) {
        // Save an empty result object
        var result = {};

        //Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("h2")
          .children("a")
          .text()
          .trim();
        result.link = $(this)
          .children("h2")
          .children("a")
          .attr("href");

        result.summary = $(this)
          .children(".summary")
          .text()
          .trim();

        console.log(result);

        //Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("Scrape Is Finished");
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            //res.json(err);
          });
      });
    });
  });
};
