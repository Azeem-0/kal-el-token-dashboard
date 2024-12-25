// const { ethers } = require("ethers");

// const privateKey = "cVcQD3zM7buDwAviQemPcfQ6myDNhjJrXiMn8Dw56L5f52xfer9R"; // Replace with your private key

// // Create a wallet instance from the private key
// const wallet = new ethers.Wallet(privateKey);

// // Get the wallet address
// console.log("Wallet Address:", wallet.address);


const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/61a164b7aa39462cb0fc75f5b0ace269");
const walletAddress = "0x699c1c9568907847F2C9845Ab6df5702e6aFa4BE";

async function getBalance() {

    const balance = await provider.getBalance(walletAddress);

    console.log(`Balance: ${ethers.formatEther(balance)} SepoliaETH`);
}

getBalance();

