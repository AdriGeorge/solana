import 'dotenv/config';
import {Connection, clusterApiUrl} from '@solana/web3.js';
import {createMint} from '@solana/spl-token';
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from '@solana-developers/helpers';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const user = getKeypairFromEnvironment('SECRET_KEY');

const tokenMint = await createMint(connection, user, user.publicKey, null, 9);
const link = getExplorerLink('address', tokenMint.toString(), 'devnet');
console.log(link);
