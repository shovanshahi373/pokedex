const axios = require("axios");

const evolutionChain = {
  basic: {
    name: name,
    image: image,
    evolves_to: [
      {
        name: name,
        image: image,
        evoFactors: {
          gender: null,
          held_item: null,
          item: [Object],
          known_move: null,
          known_move_type: null,
          location: null,
          min_affection: null,
          min_beauty: null,
          min_happiness: null,
          min_level: null,
          needs_overworld_rain: false,
          party_species: null,
          party_type: null,
          relative_physical_stats: null,
          time_of_day: "",
          trade_species: null,
          trigger: [Object],
          turn_upside_down: false
        },
        evolves_to: [
          {
            name:name,
            image: image,
            evoFactors: {
              gender: null,
              held_item: null,
              item: [Object],
              known_move: null,
              known_move_type: null,
              location: null,
              min_affection: null,
              min_beauty: null,
              min_happiness: null,
              min_level: null,
              needs_overworld_rain: false,
              party_species: null,
              party_type: null,
              relative_physical_stats: null,
              time_of_day: "",
              trade_species: null,
              trigger: [Object],
              turn_upside_down: false
            },
          },
          //{if any other...}
        ]
      }
    ]
  },
  secondStage: [
    {
      name: name,
      image: image,
      evoFactors: {
        gender: null,
        held_item: null,
        item: [Object],
        known_move: null,
        known_move_type: null,
        location: null,
        min_affection: null,
        min_beauty: null,
        min_happiness: null,
        min_level: null,
        needs_overworld_rain: false,
        party_species: null,
        party_type: null,
        relative_physical_stats: null,
        time_of_day: "",
        trade_species: null,
        trigger: [Object],
        turn_upside_down: false
      }
    }
    //{
    //if any other alternate 2nd evo...
    //}
  ],
  thirdStage: [
    {
      name: name,
      image: image
    }
    //{
    //if any other alternate 3rd evo...
    //}
  ]
};

await axios.get(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.species.name}/`).then(result => {
  const {name,sprite:{front_default}} = await result.data
  evolutionChain.basic = {};
  evolutionChain.basic.name = name;
  evolutionChain.basic.image = front_default;
  if (evoChain.chain.evolves_to.length) {
    evolutionChain.basic.evoFactors
    const secondStageEvos = evoChain.chain.evolves_to.map(secEvo => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${secEvo.species.name}/`).then(result => {

      })
    })
  }
})
