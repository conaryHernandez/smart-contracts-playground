import React, { useEffect, useState } from 'react';
import lottery from './lottery';
import web3 from './web3';
import './App.css';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [message, setMessage] = useState('');

  const amountInEther = web3.utils.fromWei(balance, 'ether');

  const getContractData = async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    setManager(manager);
    setPlayers(players);
    setBalance(balance);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success... ');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amountValue, 'ether')
    });

    setMessage('You have been entered!');
  };

  const onClickHandler = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success... ');

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setMessage('A winner has been picked!');
  };

  useEffect(() => {
    getContractData();
  }, []);

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by: {manager}
        <br />
        There are currently {players.length} people entered, competing to win{' '}
        {amountInEther}
      </p>
      <hr />
      <form onSubmit={onSubmitHandler}>
        <h4>Want to try your luck?</h4>

        <div>
          <label>Amount of ether to enter:</label>
          <br />
          <input
            onChange={e => setAmountValue(e.target.value)}
            value={amountValue}
          />
        </div>
        <button>Enter</button>
      </form>

      <br />

      <h4>Ready to pick a winner?</h4>
      <button onClick={onClickHandler}>Pick a winner!</button>

      <br />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
