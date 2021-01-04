// Dependencies
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let database = require('./db/db.json');
const path = require('path');

// Runs server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"))

// Routes

// Route to Home page -- index.html
app.get("/", function(request, result) {
    result.sendFile(path.join(__dirname, "./public/index.html"))
});

// Route to Notes page -- notes.html
app.get("/api/notes", function(request, result) {
  result.json(database);
})

// Post new note and validate there is data to send
app.post("/api/notes", function(request, result) {
    console.log(request.body)
    // Validate request body
    if(!request.body.title) {
      return result.json({error: "Missing required title"});
    }
  
    // Copy request body and generate ID
    const note = {...request.body, id: uuidv4()}
  
    // Push note to database array - saves data in memory
    database.push(note);
  
    // Saves data to file by persisting in memory variable database to db.json file.
    fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(database), (err) => {
      if (err) {
        return result.json({error: "Error writing to file"});
      }
  
      return result.json(note);
    });
  });

app.delete("/api/notes/:id", function(request, result) {
  
  console.log(`delete: ${request.params.id}`)
  console.log({database})

  // Assign new array to database excluding the selected note
  database = database.filter(note => note.id != request.params.id);

  // write the new array to the database JSON file
  fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(database), (err) => {
    if (err) {
      return result.json({error: "Error writing to file"});
    }

    return result.json(database);
  });
})

  app.get("*", function(request, result) {
    result.sendFile(path.join(__dirname, "./public/index.html"))
});
  
  // Starts the server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  