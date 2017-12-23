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

const sendPost = articleId => {
  $("#comment-submit").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    console.log("Article Id ------> ", articleId);
    console.log(
      $("#message-text")
        .val()
        .trim()
    );

    $.ajax({
      method: "POST",
      url: "/articles/" + articleId,
      data: {
        // Value taken from note textarea
        body: $("#message-text")
          .val()
          .trim()
      }
    }).done(response => {
      console.log("Comment Posted");
      $("#message-text").val("");
      console.log(response);
      location.reload();
    });
  });
};

$(document).ready(function() {
  $("button[type=save]").on("click", function(event) {
    event.preventDefault();
    console.log("Save Articles Clicked");

    let articleId = $(this)
      .parent()
      .attr("data-id");

    console.log("Article Id ------> ", articleId);

    changeToSaved(this, articleId);
  });

  $("button[type=notes]").on("click", function(event) {
    event.preventDefault();
    console.log("Add Notes Clicked");
    let articleId = $(this)
      .parent()
      .attr("data-id");

    $("#comments-modal").attr("data-articleId", articleId);

    $.get("/grabcomments/" + articleId).done(response => {
      console.log("Response", response);
    });

    //Post comments
    sendPost(articleId);
  });
});
