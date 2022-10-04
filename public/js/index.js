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

    function filterEmotionForGraph() {
        var mylist = document.getElementById("myList");
        var keyWord = mylist.options[mylist.selectedIndex].text;
        fillGraphSection(keyWord);
    }
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
                    fetch("/thumbnails").then(response => response.json()).then(thumbnails => {
                        var thumbnailArray = thumbnails.thumbnails;
                        for (var i = 0; i < videoArray.length; i++) {
                            var tempArray = videoArray[i].replace(".mp4", "").split("-");
                            var tempClip = new Clip();
                            tempClip.name = tempArray[0] + tempArray[1];
                            tempClip.emotion = tempArray[0];
                            tempClip.emotionValue = tempArray[1];
                            tempClip.videoPath = "./video/" + videoArray[i];
                            tempClip.timestamp.push(emotionArray[i]["Start Value"][1] + emotionArray[i]["Start Value"][2] + emotionArray[i]["Start Value"][3]);
                            tempClip.timestamp.push(emotionArray[i]["Stop Value"][1] + emotionArray[i]["Stop Value"][2] + emotionArray[i]["Stop Value"][3]);

                            for (var k = 0; k < thumbnailArray.length; k++) {
                                var temp = thumbnailArray[k].replace(".png", "")
                                if (temp.includes(videoArray[i].replace(".mp4", ""))) {
                                    tempClip.thumbnail.src = "./MQP Screenshots/" + thumbnailArray[k]
                                }
                            }
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
                        fillProfileSection();
                        // filterEmotionForGraph();
                        fillClipsSection();
                    });
                });
        })
    }, false);

window.filterEmotionForGraph = function filterEmotionForGraph() {
    var svg = d3.select('svg');
    svg.selectAll('*').remove();
    var mylist = document.getElementById("myList");
    var keyWord = mylist.options[mylist.selectedIndex].text;
    fillGraphSection(keyWord);
}

function fillPeopleSection() {
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
                    k++;
                }
            }
        }
        document.getElementById("studentBox").appendChild(cln)
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

function convertTime(timeStamp) {
    var minutes = Math.floor(timeStamp / 60)
    var seconds = timeStamp - minutes * 60;
    if (seconds < 10) {
        return minutes.toString() + ":0" + seconds.toString()
    } else {
        return minutes.toString() + ":" + seconds.toString()
    }

}

/*
    TODO: Add graph support for by emotion, people
*/

function fillGraphSection(keyWord) {
    var svg = d3.select('svg');
    var exampleClips0 = [];
    for (let i = 0; i < exampleClips.length; i++) {
        var emotion = exampleClips[i].emotion;
        if (emotion.includes(keyWord)) {
            exampleClips0.push(exampleClips[i]);
        }
    }

    var freq = [];
    var check = false;

    for (let i = 0; i < exampleClips0.length; i++) {
        const key = parseInt(exampleClips0[i].emotionValue);
        check = false;
        for (let j = 0; j < freq.length; j++) {
            if (freq[j].value == key) { // key already exist
                check = true;
                freq[j].count += 1
            }
        }

        if (!check) {
            freq.push({
                value: key,
                count: 1
            })
        }
    }
    
    const valueArray = Array.from(freq.values());
    var valueDomain = freq.map(a => a.count);
    const maxFrequency = Math.max(...valueDomain);
    var nameDomain = freq.map(a => a.value);
    const maxDomain = Math.max(...nameDomain);
    for (let i = 0; i < maxDomain; i++) {
        if (!nameDomain.includes(i)) {
            freq.push({
                value: i,
                count: 0
            });
        }
    }
    

    // sort based on intensity
    freq.sort((a, b) => (a.value > b.value) ? 1 : -1)
    nameDomain = freq.map(a => a.value)

    console.log(freq)

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {top: 20, bot: 20, left: 20, right: 20};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bot;

    const yScale = d3.scaleLinear()
        .domain([0, maxFrequency])
        .range([innerHeight, 0]);

    const xScale = d3.scaleBand()
        .domain(nameDomain)
        .range([0, innerWidth]);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
        
    g.append('g').call(d3.axisLeft(yScale))
        .attr('transform', `translate(${margin.left}, 0)`);
    g.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(${margin.left}, ${innerHeight})`);
  
    g.selectAll("rect").data(freq)
        .enter().append("rect")
        .attr('x', d => margin.left + xScale(d.value))
        .attr('y', d => yScale(d.count))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.count))
        .style("fill", "#69b3a2")
        .style("opacity", 0.6);


    var rawNameDomain = exampleClips0.map(d => parseInt(d.emotionValue));
    const average = Math.round((rawNameDomain.reduce((a, b) => a + b, 0) / rawNameDomain.length) * 100) / 100;
    const v = 2.54;
    const std = 3.27;
    svg.append("circle").attr("cx",980).attr("cy",130).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",980).attr("cy",160).attr("r", 6).style("fill", "#404080")
    svg.append("circle").attr("cx",980).attr("cy",190).attr("r", 6).style("fill", "#69b3a2")
    svg.append("text").attr("x", 1000).attr("y", 100).text("Significant Stats").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 1000).attr("y", 130).text("Mean: " + average).style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 1000).attr("y", 160).text("Variance: " + v).style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 1000).attr("y", 190).text("Standard Deviation: " + std).style("font-size", "15px").attr("alignment-baseline","middle")
}

function fillProfileSection() {
    var defaultPersonImage = examplePeople[0];
    displayTop3ClipAccordingtoEmotion(defaultPersonImage, "Top-3");
}

function fillClipsSection() {
    //fills clip section

    for (var i = 0; i < 217; i + 3) {

        var clipBlockName = "clipBlock" + "-" + i.toString()

        for (var j = i; j < i + 3 && j < 217; j++) {
            if (j == 0) {
                var cln = document.getElementById("clipEntry-0").cloneNode(true)
                document.getElementById("clipEntry-0").id = "clipEntry" + "-" + (j + 1).toString()
                document.getElementById("thumbnail-0").replaceWith(exampleClips[j].thumbnail)
                document.getElementById("thumbnail-0").setAttribute('style', "max-width: 128px; max-height: 128px;")
                document.getElementById("thumbnail-0").setAttribute('onclick', "displayMe(this)");
                document.getElementById("thumbnail-0").setAttribute('id', "thumbnail" + "-" + (j + 1).toString())
                document.getElementById("clipName-0").setAttribute('id', "clipName" + "-" + (j + 1).toString())
                document.getElementById("clipTimeStamp-0").setAttribute('id', "clipTimeStamp" + "-" + (j + 1).toString())

                var timeStamps = document.getElementById("clipTimeStamp-" + (j + 1).toString()).childNodes;
                var firstTimeStamp;
                var secondTimeStamp;
                if (exampleClips[j].timestamp[0].includes(".")) {
                    firstTimeStamp = exampleClips[j].timestamp[0].split(".");
                    timeStamps[0].innerHTML = firstTimeStamp[0]
                    timeStamps[0].innerHTML = convertTime(parseInt(firstTimeStamp[0]))
                } else {
                    firstTimeStamp = exampleClips[j].timestamp[0];
                    timeStamps[0].innerHTML = convertTime(parseInt(firstTimeStamp))
                }

                if (exampleClips[j].timestamp[1].includes(".")) {
                    secondTimeStamp = exampleClips[j].timestamp[1].split(".");
                    timeStamps[2].innerHTML = convertTime(parseInt(secondTimeStamp[0]))
                } else {
                    secondTimeStamp = exampleClips[j].timestamp[1];
                    timeStamps[2].innerHTML = convertTime(parseInt(secondTimeStamp))
                }

                document.getElementById("clipName" + "-" + (j + 1).toString()).innerHTML = exampleClips[j].name
                j++
                document.getElementById(clipBlockName).appendChild(cln)
            } else {

                var cln = document.getElementById("clipEntry-0").cloneNode(true)
                document.getElementById(clipBlockName).appendChild(cln)

                document.getElementById("clipEntry-0").id = "clipEntry" + "-" + (j).toString()
                document.getElementById("thumbnail-0").setAttribute('id', "thumbnail" + "-" + (j).toString())
                document.getElementById("clipName-0").setAttribute('id', "clipName" + "-" + (j).toString())
                document.getElementById("clipTimeStamp-0").setAttribute('id', "clipTimeStamp" + "-" + (j).toString())

                //document.getElementById("clipEntry" + "-" + (j - 1).toString()).setAttribute('style', 'overflow: hidden; margin: 50px;')

                document.getElementById("thumbnail" + "-" + (j).toString()).setAttribute('onclick', "displayMe(this)");
                document.getElementById("thumbnail" + "-" + (j).toString()).setAttribute('src', exampleClips[j].thumbnail.src)
                document.getElementById("thumbnail" + "-" + (j).toString()).setAttribute('style', "max-width: 128px; max-height: 128px;")


                document.getElementById("clipName" + "-" + (j).toString()).innerHTML = exampleClips[j].name

                var timeStamps = document.getElementById("clipTimeStamp-" + j.toString()).childNodes;
                var firstTimeStamp;
                var secondTimeStamp;
                if (exampleClips[j].timestamp[0].includes(".")) {
                    firstTimeStamp = exampleClips[j].timestamp[0].split(".");
                    timeStamps[0].innerHTML = firstTimeStamp[0]
                    timeStamps[0].innerHTML = convertTime(parseInt(firstTimeStamp[0]))
                } else {
                    firstTimeStamp = exampleClips[j].timestamp[0];
                    timeStamps[0].innerHTML = convertTime(parseInt(firstTimeStamp))
                }

                if (exampleClips[j].timestamp[1].includes(".")) {
                    secondTimeStamp = exampleClips[j].timestamp[1].split(".");
                    timeStamps[2].innerHTML = convertTime(parseInt(secondTimeStamp[0]))
                } else {
                    secondTimeStamp = exampleClips[j].timestamp[1];
                    timeStamps[2].innerHTML = convertTime(parseInt(secondTimeStamp))
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

function findCurrentPersonInTop3Region(image) {
    var pfp = document.getElementsByClassName("profilePic");
    if (pfp.item(0) == null) {
        return examplePeople[0];
    }

    pfp[0].src = image.src;

    var currentPerson;
    var imageName = image.id.split("-");
    for (var i = 0; i < examplePeople.length; i++) {
        if (image.id.includes(examplePeople[i].name)) {
            currentPerson = examplePeople[i];
        }
    }

    return currentPerson;
}

function setHeadLineTop3Region(image) {
    var currentPerson = findCurrentPersonInTop3Region(image);
    var cln = document.getElementById("area").cloneNode(true);
    document.getElementsByClassName("panel-heading")[0].innerHTML = "Profile: " + currentPerson.name + " ";
    document.getElementsByClassName("panel-heading")[0].appendChild(cln);
}

function displayTop3ClipAccordingtoEmotion(currentPerson, emotion) {
    var formattedCurrentPersonName = currentPerson.name.slice(0, 6) + '-' + currentPerson.name.slice(6);

    // filter top 3 that has currentPerson and emotion
    var top3;
    if (emotion == "Top-3") {
        top3 = exampleClips.filter(clip => clip.videoPath.includes(formattedCurrentPersonName));
    } else {
        top3 = exampleClips.filter(clip => clip.name.includes(emotion) && clip.videoPath.includes(formattedCurrentPersonName));
    }
    top3.sort().reverse();
    top3 = top3.slice(0, Math.min(3, top3.length));
    
    // displaying the clips
    var link = [];
    for (let i = 0; i < top3.length; i++) {
        link.push(document.getElementsByClassName("clipLink" + (i + 1).toString()));
        link[i][0].innerHTML = top3[i].name;
        link[i][0].onclick = () => displayMeFromPClick(top3[i]);
    }
}


function personOnClick(image) {
    // set currentPerson to all element in navbar
    var currentPerson = findCurrentPersonInTop3Region(image);

    // Setting on click function to tabs of the top 3 region (happy, anger, fear, surprise)
    var top3Button = document.getElementById("top-3-button");
    top3Button.onclick = () => displayTop3ClipAccordingtoEmotion(currentPerson, "Top-3");
    var happyButton = document.getElementById("happy-button");
    happyButton.onclick = () => displayTop3ClipAccordingtoEmotion(currentPerson, "Happy");
    var fearButton = document.getElementById("fear-button");
    fearButton.onclick = () => displayTop3ClipAccordingtoEmotion(currentPerson, "Fear");
    var angerButton = document.getElementById("anger-button");
    angerButton.onclick = () => displayTop3ClipAccordingtoEmotion(currentPerson, "Anger");
    var surpriseButton = document.getElementById("surprise-button");
    surpriseButton.onclick = () => displayTop3ClipAccordingtoEmotion(currentPerson, "Surprise");


    // Setting headline of top 3 (including name and current person profile picture)
    setHeadLineTop3Region(image);


    // Displaying top 3 in general
    displayTop3ClipAccordingtoEmotion(currentPerson, "Top-3");
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