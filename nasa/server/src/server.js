const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://debjitroy86:wipro%40123@nasacluster.k3dmcye.mongodb.net/nasa?retryWrites=true&w=majority";
// express is just a middleware
// passiong express object to create server. see the difference in express_ex example
// this approach helps separating express functionality from server
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("mongo db connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error("mongo error ", err);
});

(async () => {
  await mongoose.connect(MONGO_URL);
  // forcing listening on port only after data loaded
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
})();
