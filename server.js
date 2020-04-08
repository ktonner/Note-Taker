const express = require("express");
const app = express();
var path = require("path");
const fs = require("fs")

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//declaring the id variable
uniqueID = 2

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


//GET `/notes` - Should return the `notes.html` file.

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"))
})

//  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
//and then return the new note to the client.

app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    var newNote = req.body
    console.log(newNote)
    uniqueID++
    newNote.id = uniqueID
    res.json(newNote)
    console.log(newNote)
    fs.readFile('/db/db.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(newNote)
        fs.writeFile("/db/db.json", JSON.stringify(json))

    })
})


    //Server listening

    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`)
    })