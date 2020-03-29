// const axios = require("axios");

// const data = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)

const getMovePool = async (moves) => {
  const usummoves = moves.filter(move => {
    const result = await axios.get(move.move.url);
    const movedetails = await result.data;
    const { accuracy, type, power, pp, damage_class, effect_entries} = movedetails;
    return {
      name: move.move.name,
      accuracy,
      type,
      power,
      pp,
      damage_class,
      effect_entries,
      lvl: move.version_group_details[0].level_learned_at,
      learnMethod: move.version_group_details[0].move_learn_method.name,
      version: move.version_group_details[0].version_group.name
    }
  });
  return usummoves;
};

const getUSUMMoves = (moves) => {
  moves.map(move => {
    if (move.version_group_details.)
  })
}

//format
// const movePool = {
//   usum: {
//     lvlUpMoves: [
//       {
//         name: String,
//         lvl: Number,
//         type: type,
//         category: category,
//         power: power,
//         accracy: accracy
//       }
//     ],
//     tutorMoves: [
//       {
//         name: String,
//         tmNo: Number,
//         type: type,
//         category: category,
//         power: power,
//         accracy: accracy
//       },
//     ],
//     eggMoves: [
//       {
//         name: String,
//         type: type,
//         category: category,
//         power: power,
//         accracy: accracy
//       }
//     ]
//   },
//   sm: {
//     lvlUpMoves: [
//       {
//         name: String,
//         lvl: Number,
//         type: type,
//         category: category,
//         power: power,
//         accracy: accracy
//       }
//     ],
//     tutorMoves: [
//       {
//         name: String,
//         tmNo: Number,
//         type: type,
//         category: category,
//         power: power,
//         accracy: accracy
//       },
//     ],
//     eggMoves: [
//       {
//         name: String,
//         type: type,
//         category: category,
//         power: power,
//         accracy: accracy
//       }
//     ]
//   }
// }