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

class Clip {
  constructor() {
    this.name = "ClipDefault";
    this.timestamp = [];
    this.emotion = "EmotionDefault";
    this.emotionValue = 0;
    this.people = [];
    this.thumbnail = document.createElement('img');
    this.previewGif = document.createElement('img');
    this.thumbnail.src = "https://i.gyazo.com/0228882f42a760cc23b36c95b78da4f0.png";
    this.previewGif.src = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif";
  }
}

class Person {
  constructor() {
    this.name = "John Doe";
    this.topClips = []
    this.image = document.createElement('img');
    this.image.src = "https://previews.123rf.com/images/kurhan/kurhan1103/kurhan110300100/9050894-happy-man.jpg";
  }
}

var exampleClips = [];
var examplePeople = [];


window.addEventListener('load',
  function() {
    examplePeople = [new Person(), new Person(), new Person()]

    for (var i = 0; i < examplePeople.length; i++) {

      for (var j = 0; j < 3; j++) {
        var temp = new Clip()
        examplePeople[i].topClips.push(temp)
        exampleClips.push(temp)
      }
    }

    //fill students portion with People
    for (var i = 0; i < examplePeople.length; i++) {
      for (var j = 0; j < 3; j++) {
        document.getElementById("image" + (j + 1).toString()).src = examplePeople[i].image.src
      }
      var og = document.getElementById("studentRow")
      var cln = og.cloneNode(true)
      document.getElementById("studentBox").appendChild(cln)
    }


    //fills clip section
    for (var i = 0; i < exampleClips.length; i++) {
      for (var j = i; j < i + 3; j++) {
        document.getElementById("thumbnail1").src = exampleClips[j].thumbnail.src
        document.getElementById("clipName").innerHTML = exampleClips[j].name
      }
      var og = document.getElementById("clipBlock")
      var cln = og.cloneNode(true)
      document.getElementById("data").appendChild(cln)
    }
  }, false);



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