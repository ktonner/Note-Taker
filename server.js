const express = require("express");
const app = express();
var path = require("path");
const fs = require("fs")

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//grabbing the db.json
var contents = fs.readFileSync("db/db.json")
var notes = JSON.parse(contents)

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});


//GET `/notes` - Should return the `notes.html` file.

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
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
    console.log(req.body)
    uniqueID = (notes.length + 1)
    newNote.id = uniqueID
    notes.push(newNote)
    console.log(notes)

    fs.writeFile('db/db.json', JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log('Updated');
    });
    res.json(newNote)
})

//DELETE the note server side

app.delete("/api/notes/:id", function(req, res){
    //we want to only return the notes that DON'T have the delete id
    notes = notes.filter(note=>note.id != req.params.id)
    
    //write the new json file
    fs.writeFile('db/db.json', JSON.stringify(notes), function(err){
        if(err) throw err;
        console.log('Deleted')
    })
    return res.json(notes)
})

//Server listening

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})