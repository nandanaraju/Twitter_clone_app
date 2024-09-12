async function main() {
    const TweetContract = await ethers.getContractFactory("TweetContract");
    const tweetContract = await TweetContract.deploy();
    await tweetContract.deployed();

    console.log("TweetContract deployed to:", tweetContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
