import { Button, Divider } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { Business, Session } from "../models/models";
import APIURL from "../lib/environment";
import BusinessCard from "./BusinessCard";

interface Props {session: Session}

interface InitialState {
  businesses?: Business[]
}

class CustomerDashboard extends Component<Props, InitialState> {
  

  getBusinessData = () => {
    fetch(`${APIURL}/business`, {
      method: "GET",
      
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.session.token
      }),
    })
      .then((response) => response.json())
      .then((business) => {
        console.log(business);
        this.setState({
          businesses: business
        })
        
      });
  }

  componentDidMount() {
    this.getBusinessData();
  }

  render() {
    return (
      <div>
        {
          this.state?.businesses && this.state?.businesses.map((data) => {
            return(
              <div><BusinessCard session={this.props.session} business={data} /></div>
            )
          })
        }
                  
      </div>
    );
  }
}

export default CustomerDashboard;
