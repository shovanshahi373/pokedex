const client = require("./db");

module.exports = async () => {
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
};
