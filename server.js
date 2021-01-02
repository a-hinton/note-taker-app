// Dependencies
const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const database = require('./db/db.json');
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
    result.sendFile(path.join(__dirname, "/public/index.html"))
});

// Route to Notes page -- notes.html
app.get("/notes", function(request, result) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})
