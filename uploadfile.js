const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const firebase = require("firebase");

const db = firebase.initializeApp({
  apiKey: "AIzaSyARzhmUBDAO0r9HrfYotLMpUq8YJfqieZE",
  authDomain: "pokedexy-75e02.firebaseapp.com",
  databaseURL: "https://pokedexy-75e02.firebaseio.com",
  projectId: "pokedexy-75e02",
  storageBucket: "pokedexy-75e02.appspot.com",
  messagingSenderId: "160676003245",
  appId: "1:160676003245:web:78e8221c22a1f1b904b524",
  measurementId: "G-BKD7TRJT1E"
});

fs.readdir(__dirname + "/resources/images/png/", (err, files) => {
  files.slice(0, 3).forEach(file => {
    console.log(file);
    fs.readFile(__dirname + "/resources/images/png/" + file, (err, data) => {
      if (err) return console.log("error reading file " + "'" + file + "'");
      db.storage(`gs://pokedexy-75e02.appspot.com`)
        .ref()
        .put(data);

      // fs.writeFile(__dirname + "/resources/images/" + file, data, err => {
      //   if (err) return console.log("error while writing file...");
      //   console.log("successful");
      // });
    });
  });
});
