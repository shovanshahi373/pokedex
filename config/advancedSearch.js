let pkmn = require("../resources/json/completePokeInfo.json");
let filter = pkmn;

module.exports = function(region, type) {
  console.log(region, type, typeof region, typeof type);
  if (type !== "undefined" && type !== "---Type---") {
    // const ctype = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    filter = pkmn.filter(pokemon => {
      for (let i = 0; i < pokemon.type.length; i++) {
        if (pokemon.type[i] === type) {
          return pokemon;
        }
      }
    });
  }

  if (region !== "undefined" && region !== "---Region---") {
    switch (region) {
      case "Kanto":
        filter = filter.filter(p => {
          return 1 <= p.id && p.id <= 151;
        });
        break;

      case "Johto":
        filter = filter.filter(p => {
          return 152 <= p.id && p.id <= 252;
        });
        break;

      case "Hoenn":
        filter = filter.filter(p => {
          return 253 <= p.id && p.id <= 386;
        });
        break;

      case "Sinnoh":
        filter = filter.filter(p => {
          return 387 <= p.id && p.id <= 493;
        });
        break;

      case "Unova":
        filter = filter.filter(p => {
          return 494 <= p.id && p.id <= 649;
        });
        break;

      case "Kalos":
        filter = filter.filter(p => {
          return 650 <= p.id && p.id <= 721;
        });
        break;

      case "Alola":
        filter = filter.filter(p => {
          return 722 <= p.id && p.id <= 809;
        });
        break;

      default:
        break;
    }
  }

  return filter;
};
