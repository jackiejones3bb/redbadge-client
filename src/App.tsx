import {
  BrowserRouter as Router,
  Redirect,
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
import BusinessDashboard from './components/BusinessDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import LoyaltyForm from './components/LoyaltyForm';
import SearchCustomer from './components/SearchCustomer';




export class App extends Component<{}, Session> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: '',
    }
  }

// update session with a new session value - this function is passed down at login and is called to update the session which is both the token and the user
updateSession = (newSession: Session) => {
  console.log('Update session: ', newSession)
  localStorage.setItem('session', JSON.stringify(newSession));
  this.setState(newSession)
}

// clear the session values as in logout - by leaving off the user it clears it out of state 
clearSession = () => {
  localStorage.clear();
  this.setState({
    token: '',
  })
}

protectedView = (page: string, role: string) => {
  console.log('Calling protected view', page, role)
  let component = <></>;

  if(page === 'business-dashboard') {
    component = <BusinessDashboard session={this.state} />
  }

  if(page === 'loyalty-form') {
    component = <LoyaltyForm session={this.state} />
  }

  if(page === 'customer-dashboard') {
    component = <CustomerDashboard session={this.state} />
  }

  if(page === 'customer-search') {
    component = <SearchCustomer session={this.state} />
  }

return (this.state.token && this.state.user?.role === role) ? component : <Redirect to='/' />  //must have token and role to get access, otherwise back to home

}



render() {
  return (
    <Router>
    <div>
      <Navbar session={this.state} clearSession={this.clearSession} />
      <Switch>
      <Container style={{marginTop: 250}} >
        <Route path='/' exact component={Home} />
        <Route path='/login' component={() => <Login updateSession={this.updateSession} /> } />
        <Route path='/register' component={Register} />
        <Route path='/register-business' component={() => <RegisterBusiness updateSession={this.updateSession} /> } />
        <Route path='/register-customer' component={() => <RegisterCustomer updateSession={this.updateSession} /> } />
        <Route path='/business/dashboard' component={() => this.protectedView('business-dashboard', 'business')} />
        <Route path='/business/loyalty-form/:id' component={() => this.protectedView('loyalty-form', 'business')} />
        <Route path='/customer/dashboard' component={() => this.protectedView('customer-dashboard', 'customer')} />
        <Route path='/customer/search' component={() => this.protectedView('customer-search', 'business')} />
        </Container>
      </Switch>
    </div>
    </Router>
  )
}

}


