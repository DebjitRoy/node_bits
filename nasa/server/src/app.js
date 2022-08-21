//express functions here

const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

// we can whitelist multiple origins - https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin
// sets following in request header: Access-Control-Allow-Origin: http://localhost:3000
// cors mw can be commented as we are now serving both server/client from 8000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("short")); // Logging

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public"))); // serves react FE code to host in same port http://localhost:8000

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
