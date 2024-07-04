import 'dotenv/config';
import {Connection, clusterApiUrl, PublicKey} from '@solana/web3.js';
import {getOrCreateAssociatedTokenAccount, mintTo} from '@solana/spl-token';
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from '@solana-developers/helpers';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const user = getKeypairFromEnvironment('SECRET_KEY');

const token = new PublicKey('7vdvHMUfoNU9Nd48Sv6QyRANaXDNnxckTyit8cCpEXy7');

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  token,
  user.publicKey
);

const mintTx = await mintTo(
  connection,
  user,
  token,
  tokenAccount.address,
  user,
  100 * Math.pow(10, 9)
);

const link = getExplorerLink('tx', mintTx, 'devnet');
console.log(link);
