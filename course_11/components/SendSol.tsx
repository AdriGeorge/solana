import {FC, useState, useEffect} from 'react';
import styles from '../styles/PingButton.module.css';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';

export const SendSol: FC = () => {
  const {connection} = useConnection();
  const {publicKey, sendTransaction} = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    if (connection && publicKey) {
      connection.getBalance(publicKey).then(balance => {
        setBalance(balance / web3.LAMPORTS_PER_SOL);
      });
    }
  }, [connection, publicKey]);

  const onClick = async () => {
    if (!connection || !publicKey) return;

    const transaction = new web3.Transaction();
    const recipientPubKey = new web3.PublicKey(recipient);

    const instruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: parseFloat(amount) * web3.LAMPORTS_PER_SOL,
    });

    transaction.add(instruction);

    try {
      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction signature send sol', signature);
    } catch (error) {
      console.error('Transaction failed', error);
    }
  };

  if (!connection || !publicKey) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        Balance: {balance !== null ? balance.toFixed(2) : 'Loading...'} SOL
      </div>
      <div className={styles.form}>
        <label>
          Amount to send (in SOL) <br />
          <input
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Send SOL to: <br />
          <input
            type='text'
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            className={styles.input}
          />
        </label>
        <br />
        <div className={styles.buttonContainer}>
          <button onClick={onClick} className={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
