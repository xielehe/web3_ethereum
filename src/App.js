import React, { useState } from 'react';
import Paper from './Paper.jsx'
import Appbar from './Appbar.jsx'

import { AccountProvider } from './context/account'

function App() {
  const [balance, setBalance] = useState()
  return (
    <div className="App">
      <AccountProvider>
        <Appbar balance={balance} setBalance={setBalance} />
        <Paper />
      </AccountProvider>
    </div>
  );
}

export default App;
