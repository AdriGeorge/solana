import 'dotenv/config';
import {Connection, clusterApiUrl, PublicKey} from '@solana/web3.js';
import {getOrCreateAssociatedTokenAccount} from '@solana/spl-token';
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
const link = getExplorerLink(
  'address',
  tokenAccount.address.toBase58(),
  'devnet'
);
console.log(link);
