require("@nomicfoundation/hardhat-toolbox");
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

/** @type import('hardhat/config').HardhatUserConfig */
const API= process.env.APIKEY
const URL= `https://eth-sepolia.g.alchemy.com/v2/${API}`
const ACCOUNT= `0x${process.env.ACCOUNT}`

module.exports = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: {
    sepolia: API,
    }
  },
  networks: {
    sepolia: {
      url: URL,
      accounts: [ACCOUNT]
    }
  }
};
