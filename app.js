require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const client = require("./config/db");
const pokeFetch = require("./config/pokeFetch");
const AdvancedSearch = require("./config/advancedSearch");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "resources")));

app.get("/", (req, res) => {
  pokeFetch()
    .then(pkmn => {
      console.log(pkmn);
      const { search, region, type } = req.query;
      AdvancedSearch(region, type, search).then(result => {
        res.render("index", {
          pokemon: result,
          search
        });
      });
    })
    .catch(err => console.log(err));
});

app.listen(PORT, err => {
  if (err) console.log("error connecting to server");
  console.log(`server is running in port ${PORT}...`);
});
