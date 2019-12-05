const mongoClient = require("mongodb").MongoClient;
let string;
if (process.env.NODE_ENV == "production") {
  string = `mongodb+srv://${process.env.USER}:${process.env.KEY}@cluster0-vpwzk.mongodb.net/test?retryWrites=true&w=majority`;
} else {
  const {
    general: { name, pass }
  } = require("./key");
  string = `mongodb+srv://${name}:${pass}@cluster0-vpwzk.mongodb.net/test?retryWrites=true&w=majority`;
}
client = new mongoClient(string, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("successfully running mongodb...");
});

module.exports = client;
