console.log("JS Loaded");

const changeToSaved = (button, articleId) => {
  console.log(button);
  $(button).css("background-color", "green");
  $(button).css("color", "white");
  $(button).text("Saved");

  $.ajax("/api/save/" + articleId, {
    type: "PUT"
  }).done(function() {
    console.log("article #" + articleId + " has been saved");
  });
};

$(document).ready(function() {
  $("button[type=save]").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    let articleId = $(this)
      .parent()
      .attr("data-id");
    console.log("Article Id ------> ", articleId);
    changeToSaved(this, articleId);
  });
});
