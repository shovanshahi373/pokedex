const pokeFetch = require("./pokeFetch");

module.exports = function(region, type, search) {
  let filter = [];
  return pokeFetch()
    .then(pkmn => {
      filter = pkmn;

      if (type && type !== "---Type---") {
        filter = pkmn.filter(pokemon => {
          for (let i = 0; i < pokemon.type.length; i++) {
            if (pokemon.type[i] === type) {
              return pokemon;
            }
          }
        });
      }

      if (region && region !== "---Region---") {
        switch (region) {
          case "Kanto":
            filter = filter.filter(p => {
              return 1 <= p.id && p.id <= 151;
            });
            // filter = filter.slice(0,152);
            break;

          case "Johto":
            filter = filter.filter(p => {
              return 152 <= p.id && p.id <= 252;
            });
            // filter = filter.slice(152,253);

            break;

          case "Hoenn":
            filter = filter.filter(p => {
              return 253 <= p.id && p.id <= 386;
            });
            // filter = filter.slice(253,387);

            break;

          case "Sinnoh":
            filter = filter.filter(p => {
              return 387 <= p.id && p.id <= 493;
            });
            // filter = filter.slice(387,494);

            break;

          case "Unova":
            filter = filter.filter(p => {
              return 494 <= p.id && p.id <= 649;
            });
            // filter = filter.slice(494,650);

            break;

          case "Kalos":
            filter = filter.filter(p => {
              return 650 <= p.id && p.id <= 721;
            });
            // filter = filter.slice(650,722);

            break;

          case "Alola":
            filter = filter.filter(p => {
              return 722 <= p.id && p.id <= 809;
            });
            // filter = filter.slice(722,810);

            break;

          case "Galar":
            filter = filter.filter(p => {
              return 810 <= p.id && p.id <= 890;
            });
            // filter = filter.slice(722,810);

            break;

          default:
            break;
        }
      }

      if (search) {
        const pat = new RegExp(search, "gi");
        filter = filter.filter(
          pokemon =>
            pokemon.name.english.match(pat) ||
            JSON.stringify(pokemon.id).match(pat)
        );
      }

      if (filter == []) {
        return pkmn;
      }

      return filter;
    })
    .catch(err => console.error("something went wrong...."));
};
