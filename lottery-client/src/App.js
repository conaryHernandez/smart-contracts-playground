import React, { useEffect, useState } from 'react';
import lottery from './lottery';

import './App.css';

function App() {
  const [manager, setManager] = useState('');

  const getManager = async () => {
    const manager = await lottery.methods.manager().call();

    setManager(manager);
  };

  useEffect(() => {
    getManager();
  }, []);

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This contract is managed by: {manager}</p>
    </div>
  );
}

export default App;
