import 'dotenv/config';
import {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {getKeypairFromEnvironment} from '@solana-developers/helpers';
import {createMemoInstruction} from '@solana/spl-memo';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const sender = getKeypairFromEnvironment('SECRET_KEY');

const receiver = new PublicKey('E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS');

let balanceSender = await connection.getBalance(sender.publicKey);
let balanceReceiver = await connection.getBalance(receiver);

console.log('Initial balance sender:', balanceSender / LAMPORTS_PER_SOL);
console.log('Initial balance receiver:', balanceReceiver / LAMPORTS_PER_SOL);

const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: 0.1 * LAMPORTS_PER_SOL,
});

transaction.add(transferInstruction);
const memo = 'Hey, thanks!';
const memoInstruction = createMemoInstruction(memo);
transaction.add(memoInstruction);
const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log('Transaction confirmed:', signature);

balanceSender = await connection.getBalance(sender.publicKey);
balanceReceiver = await connection.getBalance(receiver);

console.log('Final balance sender:', balanceSender / LAMPORTS_PER_SOL);
console.log('Final balance receiver:', balanceReceiver / LAMPORTS_PER_SOL);
