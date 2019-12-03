require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const client = require("./config/db");
const pokeFetch = require("./config/pokeFetch");
const AdvancedSearch = require("./config/advancedSearch");

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
  console.log("server is running in port 3000...");
});
