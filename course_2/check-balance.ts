import "dotenv/config"
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers"

const connection = new Connection(clusterApiUrl("devnet"))

console.log("Connected!")

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const publickKey = keypair.publicKey

await airdropIfRequired(connection, publickKey, LAMPORTS_PER_SOL, 0.1 * LAMPORTS_PER_SOL)

const balanceInLamports = await connection.getBalance(publickKey)
console.log(`Balance in lamports : ${balanceInLamports}`)
const balance = balanceInLamports / LAMPORTS_PER_SOL
console.log(`Balance in SOL: ${balance}`)

