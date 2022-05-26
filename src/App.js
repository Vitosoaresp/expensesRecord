import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Wallet from './pages/Wallet.jsx';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/carteira" render={ (props) => <Wallet { ...props } /> } />
        <Route path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </div>
  );
}

export default App;
