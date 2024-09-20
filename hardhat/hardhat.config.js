require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: "alchemyhol",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    alchemyhol:{
      url: "https://eth-sepolia.g.alchemy.com/v2/oMJ_sGNdY_YrqfqVCisWV7_g-8JROIqu",
      accounts:[process.env.ALCHEMYHOL_PRIVATE_KEY_1]
    },
    hardhat: {
      // See its defaults
    }
  },
  solidity: "0.8.24",
};