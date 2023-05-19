const express = require("express");
const Blockchain = require("./Blockchain");

const app = express();
const port = 3000;
const blockchain = new Blockchain();

app.get("/mine", (req, res) => {
  const newBlock = blockchain.mineBlock();
  res.json(newBlock);
});

app.listen(port, () => {
  console.log(`Blockchain app listening at http://localhost:${port}`);
});
