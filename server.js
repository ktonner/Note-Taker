const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));



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

app.get("/api/notes", function(req,res){
    return res.json(db.json)
})

app.listen(PORT, () =>{
    console.log(`Listening on Port ${PORT}`)
})