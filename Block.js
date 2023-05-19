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

    return hash.update(data).digest("hex");
  }

  isValid() {
    const previousHash = this.previousBlock ? this.previousBlock.hash : "";
    const calculatedHash = this.calculateHash();

    return calculatedHash === previousHash;
  }
}

module.exports = Block;