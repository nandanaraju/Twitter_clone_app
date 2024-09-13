const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("TwitterModule", (m) => {
    const tweet = m.contract("TweetContract");
    return { tweet };
});