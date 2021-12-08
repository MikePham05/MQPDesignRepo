$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  // Check for click events on the navbar burger icon
  $(".card-header-icon").click(function() {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"

  });
});



function filterClips() {
  var input = document.getElementById("input");
  var searchTerm = input.value.toUpperCase();
  var listItems = document.getElementById("data").children;

  Array.from(listItems).forEach((item, i) => {
    if (item.id.toUpperCase().indexOf(searchTerm) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });


}