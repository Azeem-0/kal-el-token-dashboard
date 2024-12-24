// const { ethers } = require("ethers");

// const privateKey = "3111c791a57a89bca73930b5670139cf3d42613f569e159ec94708188204d44d"; // Replace with your private key

// // Create a wallet instance from the private key
// const wallet = new ethers.Wallet(privateKey);

// // Get the wallet address
// console.log("Wallet Address:", wallet.address);


const { ethers } = require("ethers");

// Replace this with your actual Sepolia RPC URL
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/61a164b7aa39462cb0fc75f5b0ace269");
const walletAddress = "0x699c1c9568907847F2C9845Ab6df5702e6aFa4BE";

async function getBalance() {
    // Fetch the balance in wei
    const balance = await provider.getBalance(walletAddress);

    // Convert the balance to ETH and log it
    console.log(`Balance: ${ethers.formatEther(balance)} SepoliaETH`);
}

getBalance();

