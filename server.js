const http = require('http');
const express = require('express');
const fetch =
    import ('node-fetch');
const app = express();
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/videoFiles", function(req, res) {
    var array = fs.readdirSync('./public/video/');
    res.json({ videos: array });
});


app.get("/emotions", function(req, res) {

    /*fs.readFile("./public/emotionpeakvals.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        console.log("File data:", jsonString);
        res.json(jsonString);
    });*/

    let jsonFile = fs.readFileSync("./public/emotionpeakvals.json");
    let data = JSON.parse(jsonFile);

    res.json(data);
});





app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});