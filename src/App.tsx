import { Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';

export interface Session {
  token: string;
}



export class App extends Component<{}, Session> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: '',
    }
  }

render() {
  return (
    <Router>
    <Container>
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </Container>
    </Router>
  )
}

}


