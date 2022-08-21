const express = require("express");

const PORT = 8001;
const app = express();

app.get("/", (req, res) => {
  // if clusters were not forked, both requests would run on same thread and would block one for a blocking service
  // in case of forking twice, 2 processor would handle 2 threads
  res.send(`Performance example ${process.pid}`);
});

app.get("/blocking", (req, res) => {
  const startTime = Date.now();
  const blockDuration = 4000;
  while (Date.now() - startTime < blockDuration) {
    // event loop blocked
  }
  res.send(`Unblocked now!!! ${process.pid}`);
});
console.log("----------------------------");
console.log("Running server.js");
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
