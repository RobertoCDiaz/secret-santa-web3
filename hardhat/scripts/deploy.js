const { ethers } = require("hardhat");

async function main() {
    const contract = await (await ethers.getContractFactory("")).deploy();

    console.log("Contract Address: ", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    })