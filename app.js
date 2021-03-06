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
const allpokemon = require("./resources/json/completePokeInfo.json");
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

const getMovesArr = moves => {
  return new Promise((resolve, reject) => {
    const marr = moves.map(move => {
      if (move.version_group_details[0].level_learned_at !== 0) {
        return {
          name: move.move.name,
          lvl: move.version_group_details[0].level_learned_at
        };
      }
    });
    if (marr) {
      resolve(marr);
    } else {
      reject({ msg: "something went wrong..." });
    }
  });
};

app.get("/insertpokemon", (req, res) => {
  client
    .db("pokemon")
    .collection("pokeinfo")
    .insertMany([...allpokemon])
    .then(result => {
      console.log("successfully inserted pkmns....");
      return res.status(201).send("ok!");
    })
    .catch(err => console.log(err));
});

app.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    if (parseInt(id) > 807 || isNaN(parseInt(id))) {
      throw new Error("page no exist,boi");
    }
  } catch (err) {
    console.log(err);
    return res.sendFile("error.html", { root: "./resources" });
  }

  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const details = await result.data;

  let {
    species,
    sprites,
    height,
    weight,
    abilities,
    base_experience,
    moves
  } = details;
  console.log("-------------------------");

  let resArr;
  let speciesData = await axios.get(species.url);
  let spData = await speciesData.data;
  // console.log(spData);
  let evoChainData = await axios.get(spData.evolution_chain.url);
  let evoChain = await evoChainData.data;
  let stage1Data, stage2Data, stage3Data;
  stage1Data = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${evoChain.chain.species.name}/`
  );
  stage1 = await stage1Data.data;
  const evolutions = {};

  if (evoChain.chain.evolves_to.length) {
    evolutions.basic = {};
    evolutions.basic.name = stage1.name;
    evolutions.basic.image = stage1.sprites.front_default;
    evolutions.basic.evodetails = {
      ...evoChain.chain.evolves_to[0].evolution_details[0]
    };
    stage2Data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[0].species.name}/`
    );
    stage2 = await stage2Data.data;
    evolutions.secondevo = {};
    evolutions.secondevo.name = stage2.name;
    evolutions.secondevo.image = stage2.sprites.front_default;
    if (evoChain.chain.evolves_to[0].evolves_to.length) {
      evolutions.secondevo.evodetails = {
        ...evoChain.chain.evolves_to[0].evolves_to[0].evolution_details[0]
      };
      stage3Data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[0].evolves_to[0].species.name}/`
      );
      stage3 = await stage3Data.data;
      evolutions.finalevo = {};
      evolutions.finalevo.name = stage3.name;
      evolutions.finalevo.image = stage3.sprites.front_default;
    }
  }

  console.log(evolutions);
  // console.log(spData);

  getMovesArr(moves)
    .then(async result => {
      const ress = await result.sort((item1, item2) =>
        item1.lvl > item2.lvl ? 1 : -1
      );
      resArr = ress.filter(elem => elem !== undefined);

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
              exp: base_experience,
              moves: resArr,
              spData,
              evolutions
            });
          } else if (
            result.length &&
            result.length === 2 &&
            result[0].id === 1
          ) {
            res.status(200).render("pokeInfo", {
              pokemon: result[0],
              species,
              sprites,
              height: height / 10,
              weight: weight / 10,
              abilities,
              prevPokemon: null,
              nextPokemon: result[1],
              exp: base_experience,
              moves: resArr,
              spData,
              evolutions
            });
          } else if (
            result.length &&
            result.length === 2 &&
            result[0].id === 890
          ) {
            res.status(200).render("pokeInfo", {
              pokemon: result[0],
              species,
              sprites,
              height: height / 10,
              weight: weight / 10,
              abilities,
              prevPokemon: result[1],
              nextPokemon: null,
              exp: base_experience,
              moves: resArr,
              spData,
              evolutions
            });
          } else {
            res.sendFile("error.html", { root: "./resources" });
          }
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => console.log(err));
});

app.get("*", (req, res) => {
  res.sendFile("error.html", { root: "./resources" });
});

app.listen(PORT, err => {
  if (err) console.log("error connecting to server");
  console.log(`server is running in port ${PORT}...`);
});
