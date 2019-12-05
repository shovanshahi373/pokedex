require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
// const fs = require("fs");
const client = require("./config/db");
const axios = require("axios");
// const pokedex = client.db("pokedex").collection("pokeinfo");
// const pokeFetch = require("./config/pokeFetch");
// const AdvancedSearch = require("./config/advancedSearch");
const {
  getAllPkmn,
  getPkmnByType,
  getPkmnByRegion,
  searchPokemon
} = require("./config/pokeFetch");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "resources")));

app.get("/", (req, res) => {
  const { search, region, type } = req.query;
  if (!search && !region && !type) {
    return getAllPkmn().then(result => {
      return res.status(200).render("index", {
        pokemon: result,
        search
      });
    });
  }

  return getPkmnByRegion(region)
    .then(pokemonByRegion => {
      return getPkmnByType(type, pokemonByRegion);
    })
    .then(pokemonByType => {
      return searchPokemon(search, pokemonByType);
    })
    .then(finalResult => {
      return res.status(200).render("index", {
        pokemon: finalResult,
        search
      });
    })
    .catch(err => console.log(err));
});

app.get("/:id", async (req, res) => {
  let { id } = req.params;
  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const details = await result.data;

  let {
    species,
    sprites,
    height,
    weight,
    abilities,
    base_experience
  } = details;
  // const newsprites = await [...sprites];
  console.log("-------------------------");
  // console.log(newsprites);
  let pid = parseInt(id);
  client
    .db("pokemon")
    .collection("pokeinfo")
    .find({ $or: [{ id: pid }, { id: pid + 1 }, { id: pid - 1 }] })
    .toArray()
    .then(result => {
      if (result.length && result.length === 3) {
        res.status(200).render("pokeInfo", {
          pokemon: result[1],
          species,
          sprites,
          height: height / 10,
          weight: weight / 10,
          abilities,
          prevPokemon: result[0],
          nextPokemon: result[2],
          exp: base_experience
        });
      } else if (result.length && result.length === 2 && result[0].id === 1) {
        res.status(200).render("pokeInfo", {
          pokemon: result[0],
          species,
          sprites,
          height: height / 10,
          weight: weight / 10,
          abilities,
          prevPokemon: null,
          nextPokemon: result[1],
          exp: base_experience
        });
      } else if (result.length && result.length === 2 && result[0].id === 890) {
        res.status(200).render("pokeInfo", {
          pokemon: result[0],
          species,
          sprites,
          height: height / 10,
          weight: weight / 10,
          abilities,
          prevPokemon: result[1],
          nextPokemon: null,
          exp: base_experience
        });
      } else {
        res
          .status(404)
          .send(
            "<h1>The page you are trying to access doesn't seem to exist or is currently unavailable...</h1>"
          );
      }
    })
    .catch(err => res.status(500).json(err));
});

app.get("*", (req, res) => {
  res.status(404).send("bad request!!");
});

app.listen(PORT, err => {
  if (err) console.log("error connecting to server");
  console.log(`server is running in port ${PORT}...`);
});
