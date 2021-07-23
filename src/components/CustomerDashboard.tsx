import { Button, Divider } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { Business, Customer, Session } from "../models/models";
import APIURL from "../lib/environment";
import BusinessCard from "./BusinessCard";

interface Props {session: Session}

interface InitialState {
  businesses?: Business[]
  customer?: Customer
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

  getCustomerData = () => {
    fetch(`${APIURL}/customers/${this.props.session.user?.customerId}`, {
      method: "GET",
      
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.session.token
      }),
    })
      .then((response) => response.json())
      .then((customer) => {
        console.log(customer);
        this.setState({
          customer: customer[0]
        })
        
      });
  }
  deleteMembership = (id: number | undefined) => {
    fetch(`${APIURL}/memberships/${id}`, {
      method: "DELETE",
      
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.session.token
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.getCustomerData()
        
      });
  }

  addMembership = (id: number) => {
    fetch(`${APIURL}/memberships`, {
      method: "POST",
      body: JSON.stringify({
        customerId: this.props.session.user?.customerId,
        businessId: id
      }),
      
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.session.token
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.getCustomerData()
        
      });
  }

  componentDidMount() {
    this.getCustomerData();
    this.getBusinessData();
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {`${this.state?.customer?.user?.firstName} ${this.state?.customer?.user?.lastName}`}
          </div>
          <div>
            <h1>The new crap</h1> 
          {
          this.state?.customer && this.state?.customer?.businesses?.map((data) => {
            return(
              <div>{data.name}<Button onClick={() => this.deleteMembership(data?.memberships?.id)}>Remove</Button></div>
            )
          })
        }
          </div>
        </div>
        <div>
          <h1>All the crap</h1>
        {
          this.state?.businesses && this.state?.businesses.map((data) => {
            return(
              <div>
                {/* <BusinessCard session={this.props.session} business={data} /> */}
                {data.id}
              <button onClick={() => this.addMembership(data.id)}>Add</button></div>
            )
          })
        }
            </div>      
      </div>
    );
  }
}

export default CustomerDashboard;
