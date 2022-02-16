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
        this.name = "Clip Default";
        this.timestamp = [];
        this.emotion = "Emotion Default";
        this.emotionValue = 0;
        this.people = [];
        this.thumbnail = document.createElement('img');
        this.thumbnail.id = "thumbnail-0"
        this.previewGif = document.createElement('img');
        this.previewGif.id = "previewGif-0"
        this.thumbnail.src = "https://bulma.io/images/placeholders/128x128.png";
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
                console.log("added clip for" + examplePeople[i].name)
            }
        }

        //fill students portion with People
        for (var i = 0; i < examplePeople.length; i++) {
            for (var j = 0; j < 3; j++) {
                document.getElementById("image" + (j + 1).toString()).src = examplePeople[i].image.src
                console.log("added " + examplePeople[i].name + "'s picture'")
            }
            var og = document.getElementById("studentRow")
            var cln = og.cloneNode(true)
            document.getElementById("studentBox").appendChild(cln)
            console.log("copied and placed a student row")
        }

        console.log(exampleClips)
            //fills clip section




        for (var i = 0; i < exampleClips.length; i + 3) {
            var clipBlockName = "clipBlock" + "-" + i.toString()

            for (var j = i; j < i + 3 && i < exampleClips.length; j++) {

                if (j == 0) {
                    console.log("I went in the first one")
                    var cln = document.getElementById("clipEntry-0").cloneNode(true)
                    console.log(cln)
                    document.getElementById("clipEntry-0").id = "clipEntry" + "-" + (j + 1).toString()

                    document.getElementById("thumbnail-0").replaceWith(exampleClips[j].thumbnail)
                    document.getElementById("thumbnail-0").setAttribute('id', "thumbnail" + "-" + (j + 1).toString())
                    document.getElementById("clipName-0").setAttribute('id', "clipName" + "-" + (j + 1).toString())
                    document.getElementById("clipTimeStamp-0").setAttribute('id', "clipTimeStamp" + "-" + (j + 1).toString())


                    document.getElementById("clipName" + "-" + (j + 1).toString()).innerHTML = exampleClips[j].name

                    document.getElementById(clipBlockName).appendChild(cln)
                } else {
                    console.log("i went in the other one")
                    var cln = document.getElementById("clipEntry" + "-" + (j - 1).toString()).cloneNode(true)
                    console.log(cln)

                    //document.getElementById("clipEntry" + "-" + (j - 1).toString()).setAttribute('style', 'overflow: hidden; margin: 50px;')

                    document.getElementById("clipEntry" + "-" + (j - 1).toString()).id = "clipEntry" + "-" + (j + 1).toString()

                    document.getElementById("thumbnail" + "-" + (j - 1).toString()).replaceWith(exampleClips[j].thumbnail)
                    document.getElementById("thumbnail-0").setAttribute('id', "thumbnail" + "-" + (j + 1).toString())
                    document.getElementById("clipName" + "-" + (j - 1).toString()).setAttribute('id', "clipName" + "-" + (j + 1).toString())
                    document.getElementById("clipTimeStamp" + "-" + (j - 1).toString()).setAttribute('id', "clipTimeStamp" + "-" + (j + 1).toString())


                    document.getElementById("clipName" + "-" + (j + 1).toString()).innerHTML = exampleClips[j].name

                    document.getElementById(clipBlockName).appendChild(cln)
                }
            }

            // if (i == 0) {
            //   var example = document.getElementById("clipEntry-0")
            //   example.parentElement.removeChild(example);
            // }

            i = j

            var newClipBlock = document.createElement("div")
            newClipBlock.classList.add("tile")
            newClipBlock.classList.add("is-parent")
            newClipBlock.classList.add("is-12")
            newClipBlock.id = "clipBlock" + "-" + i.toString()
            document.getElementById("data").appendChild(newClipBlock)
        }


    }, false);



function filterClips() {
    var input = document.getElementById("input");
    var searchTerm = input.value.toUpperCase();
    var listItems = document.getElementById("data").children;

    Array.from(listItems).forEach((row, i) => {
        var rowItems = row.getElementsByClassName("media-content");
        if (rowItems.length >= 0) {
            for (var j = 0; j < rowItems.length; j++) {

                if (rowItems.item(j).querySelectorAll('[id^="clipName-"]').item(0).innerText.toUpperCase().includes(searchTerm)) {
                    console.log(rowItems);


                    /*console.log(rowItems.filter(word => word.includes("Clip 1")));
                    //console.log(rowItems.item(j).querySelectorAll('[id^="clipName-"]'));
                    //console.log(row.querySelectorAll('[id^="clipEntry-"]'));
                    var nodeList = row.querySelectorAll('[id^="clipEntry-"]');
                    for (var k = 0; k < nodeList.length; k++) {
                        console.log(nodeList.item(k).innerHTML);
                        console.log((rowItems.item(j).querySelectorAll('[id^="clipName-"]')));
                        if (nodeList.item(k).innerHTML.toUpperCase().includes(rowItems.item(j).querySelectorAll('[id^="clipName-"]')[0].id.toUpperCase())) {
                            console.log("hello");
                            nodeList.item(k).style.display = "";

                        }
                    }*/


                }
            }

        }
    });

}