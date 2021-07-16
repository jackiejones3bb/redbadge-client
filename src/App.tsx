import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import RegisterBusiness from './components/RegisterBusiness';
import { Container } from '@material-ui/core';
import RegisterCustomer from './components/RegisterCustomer';
import Login from './components/Login';
import { User, Session } from './models/models';




export class App extends Component<{}, Session> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: '',
    }
  }

// update session with a new session value - this function is passed down at login and is called to update the session which is both the token and the user
updateSession = (newSession: Session) => {
  localStorage.setItem('session', JSON.stringify(newSession));
  this.setState(newSession)
}


render() {
  return (
    <Router>
    <div>
      <Navbar />
      <Switch>
      <Container style={{marginTop: 250}} >
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/register-business' component={RegisterBusiness} />
        <Route path='/register-customer' component={RegisterCustomer} />
        </Container>
      </Switch>
    </div>
    </Router>
  )
}

}


