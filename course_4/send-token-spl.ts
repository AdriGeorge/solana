import 'dotenv/config';
import {Connection, clusterApiUrl, PublicKey} from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from '@solana/spl-token';
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from '@solana-developers/helpers';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const user = getKeypairFromEnvironment('SECRET_KEY');

const token = new PublicKey('7vdvHMUfoNU9Nd48Sv6QyRANaXDNnxckTyit8cCpEXy7');
const receiver = new PublicKey('Avc1UP4q5DyihpPmiQHQWe78GwLwQHjZM5N46dZjw1ZV');

const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  token,
  user.publicKey
);

const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  token,
  receiver
);

//FOR TRANSFER WE NEED TO PASS TOKEN ACCOUNTS, NOT WALLET ADDRESS

const sendTx = await transfer(
  connection,
  user,
  senderTokenAccount.address,
  receiverTokenAccount.address,
  user,
  5 ^ Math.pow(10, 9)
);

const link = getExplorerLink('tx', sendTx, 'devnet');
console.log(link);
