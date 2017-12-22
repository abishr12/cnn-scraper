console.log("JS Loaded");

$(document).ready(function() {
  $("button[type=save]").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    console.log(this);
    $(this).css("background-color", "green");
    $(this).css("color", "white");
  });
});
