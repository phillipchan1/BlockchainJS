const fs = require("fs");
const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [];
    this.difficulty = 4;
    this.miningReward = 10;
    this.chainFilePath = "./blockchain.json";
    this.loadChainFromFile();
  }

  addBlock(block) {
    if (block.hash === "") {
      block.hash = block.calculateHash();
    }

    console.log(this.chain);
    this.chain.push(block);
    this.saveChainToFile();
  }

  mineBlock() {
    const block = new Block();
    block.data = "This is the data for the new block.";
    block.timestamp = new Date().getTime();

    block.hash = block.calculateHash();

    this.addBlock(block);

    return block;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  loadChainFromFile() {
    try {
      const data = fs.readFileSync(this.chainFilePath);
      this.chain = JSON.parse(data);
    } catch (err) {
      console.error(`Error loading chain from file: ${err.message}`);
      if (err.code === "ENOENT") {
        console.log(`Creating new chain file: ${this.chainFilePath}`);
        this.chain = [{}];
        this.saveChainToFile();
      }
    }
  }

  saveChainToFile() {
    try {
      const data = JSON.stringify(this.chain);
      fs.writeFileSync(this.chainFilePath, data);
    } catch (err) {
      console.error(`Error saving chain to file: ${err.message}`);
    }
  }
}

module.exports = Blockchain;
