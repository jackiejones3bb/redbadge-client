import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import './App.css';

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
    <Container>
      <h1>Hello World</h1>
    </Container>
  )
}

}

export default App;
