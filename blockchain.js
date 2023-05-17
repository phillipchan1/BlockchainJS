const crypto = require("crypto");

class Block {
  constructor() {
    this.data = "";
    this.timestamp = new Date().getTime();
    this.hash = "";
  }

  calculateHash() {
    const hash = crypto.createHash("sha256")

    const data = JSON.stringify({
      data: this.data,
      timestamp: this.timestamp,
    });

    return hash.update(data)
  }

  isValid() {
    const previousHash = this.previousBlock ? this.previousBlock.hash : "";
    const calculatedHash = this.calculateHash();

    return calculatedHash === previousHash;
  }
}

class Blockchain {
  constructor() {
    this.chain = [];
    this.difficulty = 4;
    this.miningReward = 10;
  }

  addBlock(block) {
    if (block.hash === "") {
      block.hash = block.calculateHash();
    }

    this.chain.push(block);
  }

  mineBlock() {
    const block = new Block();
    block.data = "This is the data for the new block.";
    block.timestamp = new Date().getTime();

    while (!block.isValid()) {
      block.hash = block.calculateHash();
    }

    this.addBlock(block);

    return block;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
}

const blockchain = new Blockchain();

blockchain.addBlock(new Block());
blockchain.addBlock(new Block());

const latestBlock = blockchain.getLatestBlock();

console.log(latestBlock);