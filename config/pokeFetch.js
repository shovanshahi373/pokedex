const client = require("./db");

module.exports = {
  getAllPkmn: async () => {
    try {
      const pkmn = await client
        .db("pokemon")
        .collection("pokeinfo")
        .find()
        .toArray();
      // await client.close();
      return pkmn;
    } catch (err) {
      console.log("an errro has occured...\n" + err);
    }
  },
  getPkmnByType: async (type, pokemon) => {
    if (!type) {
      return pokemon;
    }
    try {
      if (pokemon.length !== 0) {
        return pokemon.filter(p => {
          for (let i = 0; i < p.type.length; i++) {
            if (p.type[i] === type) {
              return p;
            }
          }
        });
      } else {
        return await client
          .db("pokemon")
          .collection("pokeinfo")
          .find({ type: type })
          .toArray();
      }
    } catch (err) {
      console.log(err);
    }
  },
  getPkmnByRegion: async region => {
    if (!region) {
      return [];
    }
    const db = client.db("pokemon").collection("pokeinfo");
    switch (region) {
      case "Kanto":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 1 } }, { id: { $lte: 151 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }
        break;

      case "Johto":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 152 } }, { id: { $lte: 251 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }
        break;

      case "Hoenn":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 252 } }, { id: { $lte: 386 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }

        break;

      case "Sinnoh":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 387 } }, { id: { $lte: 493 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }
        break;

      case "Unova":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 494 } }, { id: { $lte: 649 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }
        break;

      case "Kalos":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 650 } }, { id: { $lte: 721 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }
        break;

      case "Alola":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 722 } }, { id: { $lte: 809 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }
        break;

      case "Galar":
        try {
          const pkmn = await db
            .find({ $and: [{ id: { $gte: 810 } }, { id: { $lte: 890 } }] })
            .toArray();
          return pkmn;
        } catch (err) {
          console.log(err);
        }
        break;

      default:
        break;
    }
  },
  searchPokemon: async (keyword, pkarr) => {
    if (!keyword) {
      return pkarr;
    }
    try {
      const pat = new RegExp(keyword, "gi");
      if (pkarr.length === 0) {
        const pkmn = await client
          .db("pokemon")
          .collection("pokeinfo")
          .find({ "name.english": { $regex: pat } })
          .toArray();
        return pkmn;
      } else {
        return pkarr.filter(
          pokemon =>
            pokemon.name.english.match(pat) ||
            JSON.stringify(pokemon.id).match(pat)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
};
