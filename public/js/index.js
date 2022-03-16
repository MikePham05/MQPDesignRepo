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
        this.videoPath = "";
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
        this.number = 0;
    }
}

var exampleClips = [];
var examplePeople = [];
var clnMain;


window.addEventListener('load',
    function() {

        //retrieve clips from filesystem and server
        fetch("/videoFiles", {
            method: "GET"
        }).then(function(response) {
            console.log("Im in the fetch!");
            return response.json();
        }).then(function(data) {
            var videoArray = data.videos;
            var emotionArray;
            fetch("/emotions")
                .then(response => response.json())
                .then(json => {
                    emotionArray = json;

                    for (var i = 0; i < videoArray.length; i++) {
                        var tempArray = videoArray[i].replace(".mp4", "").split("-");
                        var tempClip = new Clip();
                        tempClip.name = tempArray[0] + tempArray[1];
                        tempClip.emotion = tempArray[0];
                        tempClip.emotionValue = tempArray[1];
                        //tempClip.people.push(tempArray[2] + tempArray[3]);
                        tempClip.videoPath = "./video/" + videoArray[i];

                        //adding new person if it is not there already

                        var tempPerson = new Person();
                        tempPerson.name = tempArray[2] + tempArray[3];
                        tempPerson.image.src = "./faceimages/" + tempArray[3] + ".0.jpg";
                        tempPerson.number = tempArray[3];

                        var checkExist = false;
                        for (var j = 0; j < examplePeople.length; j++) {
                            if (examplePeople[j].name.includes(tempPerson.name)) {
                                checkExist = true;
                            }


                        }

                        if (checkExist == false) {
                            examplePeople.push(tempPerson);
                        }
                        tempClip.people.push(tempPerson);




                        exampleClips.push(tempClip);
                    }

                    fillPeopleSection();
                    fillClipsSection();
                });


        })



    }, false);



function fillPeopleSection() {
    //examplePeople = [new Person(), new Person(), new Person()]

    for (var i = 0; i < examplePeople.length; i++) {
        var result = [];
        for (var j = 0; j < exampleClips.length; j++) {
            if (result.length < 3) {
                if (exampleClips[j].people[0].number == examplePeople[i].number) {
                    result.push(exampleClips[j])
                }
            } else {
                for (var k = 0; k < result.length; k++) {

                    if (exampleClips[j].people[0].number == result[k].people[0].number) {
                        if (exampleClips[j].emotionValue > result[k].emotionValue) {
                            if (!result.includes(exampleClips[j]))
                                result[k] = exampleClips[j]
                        }
                    }
                }
            }

            examplePeople[i].topClips = result;
            console.log("added clip for" + examplePeople[i].name)
        }
    }

    //fill students portion with People
    var k = 0;

    for (var i = 0; i < Math.round(examplePeople.length / 3); i++) {
        var og = document.getElementById("studentRow")
        var cln = og.cloneNode(true)
        var children = cln.childNodes;

        cln.classList.add("num" + i);
        cln.classList.remove("num" + (i - 1));

        for (var j = 0; j < children.length; j++) {

            if (j % 2 == 0) {
                continue;
            } else {
                if (!(k < examplePeople.length)) {
                    break;
                } else {
                    children[j].childNodes[1].childNodes[1].src = examplePeople[k].image.src
                    children[j].childNodes[1].childNodes[1].id = "image-" + examplePeople[k].name
                    console.log("added " + examplePeople[k].name + "'s picture'")
                    k++;
                }
            }
        }
        document.getElementById("studentBox").appendChild(cln)
        console.log("copied and placed a student row")
    }

    //delete placeholders & extras

    var ones = document.querySelectorAll('[id=image1]');
    var twos = document.querySelectorAll('[id=image2]');
    var threes = document.querySelectorAll('[id=image3]');


    var all = [];
    all.push(ones, twos, threes);

    for (var i = 0; i < all.length; i++) {

        if (all[i].length <= 1) {
            all[i][0].remove();
        } else {
            for (var j = 0; j < all[i].length; j++) {

                all[i][j].remove();
            }
        }
    }

    document.querySelector("[id=studentRow]").remove();


}

function fillClipsSection() {
    //fills clip section
    console.log("I am about to fill clips");

    for (var i = 0; i < 217; i + 7) {

        var clipBlockName = "clipBlock" + "-" + i.toString()

        for (var j = i; j < i + 7 && i < 217; j++) {
            console.log("I am number" + i.toString());
            if (j == 0) {
                console.log("I went in the first one")
                var cln = document.getElementById("clipEntry-0").cloneNode(true)


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


                //document.getElementById("clipEntry" + "-" + (j - 1).toString()).setAttribute('style', 'overflow: hidden; margin: 50px;')

                document.getElementById("clipEntry" + "-" + (j - 1).toString()).id = "clipEntry" + "-" + (j + 1).toString()




                document.getElementById("thumbnail" + "-" + (j - 1).toString()).replaceWith(exampleClips[j].thumbnail);
                document.getElementById("thumbnail-0").setAttribute('onclick', "displayMe(this)");
                document.getElementById("thumbnail-0").setAttribute('id', "thumbnail" + "-" + (j + 1).toString());

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


}


function fillClipsSectionCond(condition) {
    //fills clip section
    console.log("I am about to fill clips");

    for (var i = 0; i < 217; i + 7) {

        var clipBlockName = "clipBlock" + "-" + i.toString()

        for (var j = i; j < i + 7 && i < 217; j++) {
            console.log("I am number" + i.toString());
            if (j == 0) {
                console.log("I went in the first one")
                var cln = document.getElementById("clipEntry-0").cloneNode(true)


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


                document.getElementById("clipEntry" + "-" + (j - 1).toString()).id = "clipEntry" + "-" + (j + 1).toString()




                document.getElementById("thumbnail" + "-" + (j - 1).toString()).replaceWith(exampleClips[j].thumbnail);
                document.getElementById("thumbnail-0").setAttribute('onclick', "displayMe(this)");
                document.getElementById("thumbnail-0").setAttribute('id', "thumbnail" + "-" + (j + 1).toString());

                document.getElementById("clipName" + "-" + (j - 1).toString()).setAttribute('id', "clipName" + "-" + (j + 1).toString())
                document.getElementById("clipTimeStamp" + "-" + (j - 1).toString()).setAttribute('id', "clipTimeStamp" + "-" + (j + 1).toString())


                document.getElementById("clipName" + "-" + (j + 1).toString()).innerHTML = exampleClips[j].name

                if (exampleClips[j].name.toUpperCase().includes(condition)) {
                    document.getElementById(clipBlockName).appendChild(cln);
                } else {
                    continue;
                }

            }
        }

        i = j

        var newClipBlock = document.createElement("div")
        newClipBlock.classList.add("tile")
        newClipBlock.classList.add("is-parent")
        newClipBlock.classList.add("is-12")
        newClipBlock.id = "clipBlock" + "-" + i.toString()
        document.getElementById("data").appendChild(newClipBlock)
    }


}

function personOnClick(image) {
    var pfp = document.getElementsByClassName("profilePic");

    pfp[0].src = image.src;

    var currentPerson;
    var imageName = image.id.split("-");
    for (var i = 0; i < examplePeople.length; i++) {

        if (image.id.includes(examplePeople[i].name)) {
            currentPerson = examplePeople[i];
        }
    }
    var cln = document.getElementById("area").cloneNode(true);
    document.getElementsByClassName("panel-heading")[0].innerHTML = "Profile: " + currentPerson.name + " ";
    //console.log(document.getElementById("area"));
    document.getElementsByClassName("panel-heading")[0].appendChild(cln);

    var link1 = document.getElementsByClassName("clipLink1");
    var link2 = document.getElementsByClassName("clipLink2");
    var link3 = document.getElementsByClassName("clipLink3");




    link1[0].innerHTML = currentPerson.topClips[0].name;
    link1[0].onclick = () => displayMeFromPClick(currentPerson.topClips[0]);

    link2[0].innerHTML = currentPerson.topClips[1].name;
    link2[0].onclick = () => displayMeFromPClick(currentPerson.topClips[1]);

    link3[0].innerHTML = currentPerson.topClips[2].name;
    link3[0].onclick = () => displayMeFromPClick(currentPerson.topClips[2]);
}

function displayMeFromPClick(clip) {
    document.getElementById("video").setAttribute("src", clip.videoPath);
}

function displayMe(clip) {
    var clipNum = clip.id.split("-");
    var clipPath = exampleClips[clipNum[1] - 1].videoPath

    document.getElementById("video").setAttribute("src", clipPath);
}


function revertVideo() {
    document.getElementById("video").setAttribute("src", "./hires_TE.mp4");
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function filterClips() {
    var input = document.getElementById("input");
    var searchTerm = input.value.toUpperCase();



    var listItems = document.getElementById("data").children;

    Array.from(listItems).forEach((row, i) => {
        var rowItems = row.getElementsByClassName("media-content");
        if (rowItems.length >= 0) {
            for (var j = 0; j < rowItems.length; j++) {

                if (!rowItems.item(j).querySelectorAll('[id^="clipName-"]').item(0).innerText.toUpperCase().includes(searchTerm)) {


                    var currentElement = rowItems.item(j).querySelectorAll('[id^="clipName-"]');
                    var elementEntries = row.querySelectorAll('[id^="clipEntry-"]');



                    for (var k = 0; k < elementEntries.length; k++) {

                        if (currentElement[0].id.includes(elementEntries[k].children[0].children[1].children[0].id)) {
                            elementEntries[k].style.display = "none";
                        }
                    }




                } else {
                    var currentElement = rowItems.item(j).querySelectorAll('[id^="clipName-"]');
                    var elementEntries = row.querySelectorAll('[id^="clipEntry-"]');



                    for (var k = 0; k < elementEntries.length; k++) {

                        if (currentElement[0].id.includes(elementEntries[k].children[0].children[1].children[0].id)) {
                            if (elementEntries[k].style.display == "none") {
                                elementEntries[k].style.display = "block";
                            }
                        }
                    }
                }
            }

        }
    });

}