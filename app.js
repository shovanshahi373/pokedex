const express = require("express");
const app = express();
let pkmn = require("./resources/json/completePokeInfo.json");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

// fs.exists("./resources/json/pokeimage.json", exists => {
//   if (!exists) {
//     fs.readdir("./resources/images/3dSprites", (err, file) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(path.join("./images/3dSprites/", path.basename(file[1])));
//         let data = [];
//         file.forEach(image => {
//           data.push({
//             sprite: `./images/3dSprites/${path.basename(image)}`
//           });
//         });

//         fs.writeFile(
//           "./resources/json/pokeimage.json",
//           JSON.stringify(data),
//           err => {
//             if (err) {
//               console.log("an error occured!");
//             } else {
//               console.log("successfully created json file!");
//             }
//           }
//         );
//       }
//     });
//   } else {
//     console.log("the file already exists!!");
//   }
// });

// fs.exists("./resources/json/pokeimagepng.json", exists => {
//   if (!exists) {
//     fs.readdir("./resources/images/png", (err, file) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(path.join("./images/png/", path.basename(file[1])));
//         let data = [];
//         file.forEach(image => {
//           data.push({
//             sprite: `./images/png/${path.basename(image)}`
//           });
//         });

//         fs.writeFile(
//           "./resources/json/pokeimagepng.json",
//           JSON.stringify(data),
//           err => {
//             if (err) {
//               console.log("an error occured!");
//             } else {
//               console.log("successfully created json file!");
//             }
//           }
//         );
//       }
//     });
//   } else {
//     console.log("the file already exists!!");
//   }
// });

// const newpkmn = pkmn.map((p,i) => {
//   let newe = `${pokeImg[i].sprite}`;
//   p["sprite"] = newe;
//   return p;
// })

// if(!fs.existsS("./resources/json/complete.json"))
// fs.writeFile("./resources/json/completePokeInfo.json", JSON.stringify(newpkmn),(err) => {
//   if(err) throw err;
//   console.log("successfully created complete pokedex!");
// })

// console.log(newpkmn[0]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "resources")));

app.get("/", (req, res) => {
  const { search } = req.query;
  const pat = new RegExp(search, "gi");
  if (search) {
    const filteredpkmn = pkmn.filter(pokemon => {
      return (
        pokemon.name.english.match(pat) || JSON.stringify(pokemon.id).match(pat)
      );
    });
    res.render("index", {
      pokemon: filteredpkmn,
      search
    });
  }
  res.render("index", {
    pokemon: pkmn,
    search
  });
});

app.listen(3000, err => {
  if (err) console.log("error connecting to server");
  console.log("server is running in port 3000...");
});