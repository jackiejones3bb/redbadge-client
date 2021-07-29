import { Button, Divider } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img
            src='img/line-dog.png'
            alt='dog drawing'
            style={{ height: "200px", marginBottom: '80px' }}
          />
        </div>
        <Grid container style={{ height: "30vh" }}>
          <Grid
            md={12}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Card style={{ margin: "10px", marginRight: '100px' }}>
                <CardContent style={{ padding: "40px" }}>
                  
                  
                  <Typography variant='subtitle1' gutterBottom color='primary'>
                  <span style={{fontWeight: 'bolder'}}>Hi super smart business owner!</span> Are you ready to create a seamless customer loyalty program for your business? Click 'Register as a Business' to get started!
                  </Typography>
                  <div>
                  <Link to='/register-business' style={{ textDecoration: "none" }}>
              <Button variant='contained' color='primary' size='large' style={{ marginTop: '30px'}}>
                Register as a Business
              </Button>
            </Link>
                  </div>
                  
                </CardContent>
              </Card>
            
            <Divider orientation='vertical' flexItem />
            <Card style={{ margin: "10px", marginLeft: '100px' }}>
                <CardContent style={{ padding: "40px" }}>
                  
                  <Typography variant='subtitle1' gutterBottom color='primary'>
                    <span style={{fontWeight: 'bolder'}}>Hey there savvy shopper!</span> Do you want to start using the loYOUlty rewards program for your favorite local business? Click 'Register as a Customer' to get started!
                  </Typography>
                  <Link to='/register-customer' style={{ textDecoration: "none" }}>
              <Button variant='contained' color='primary' size='large' style={{ marginTop: '30px'}}>
                Register as a Customer
              </Button>
            </Link>
                </CardContent>
              </Card>
            
          </Grid>


        </Grid>

        <Link to='/' style={{ textDecoration: "none", display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
              <Button variant='outlined' color='primary' size='large'>
                Return to Home
              </Button>
            </Link>

        
        
      </div>
    );
  }
}

export default Register;
