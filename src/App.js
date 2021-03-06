import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Landing from './components/Landing';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import Invest from './components/Invest';

import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import Calculator from './components/Calculator';
import EmailVerified from './components/EmailVerified';
import GetALoan from './components/GetALoan';

function App() {
  return (          
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
                <Route exact path='/' >
                    <Landing />
                </Route>
                <Route path='/signin' >
                    <Signin />
                </Route>
                <Route path='/signup' >
                    <Signup />
                </Route>
                <Route path='/forgotPassword' >
                    <ForgotPassword />
                </Route>
                <Route path='/calculator' >
                    <Calculator />
                </Route>
                <Route path='/email-verify' >
                    <EmailVerified />
                </Route>
                <PrivateRoute path='/get-a-loan' component={GetALoan} />
                <PrivateRoute path='/account' component={Account} />
                <PrivateRoute path='/invest' component={Invest} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
