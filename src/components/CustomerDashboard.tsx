import { Component } from "react";
import { Typography } from "@material-ui/core";
import { Business, Customer, Session } from "../models/models";
import APIURL from "../lib/environment";
import BusinessCard from "./BusinessCard";
import LoyaltyCard from "./LoyaltyCard";

interface Props {
  session: Session;
}

interface InitialState {
  businesses?: Business[];
  customer?: Customer;
}

class CustomerDashboard extends Component<Props, InitialState> {
  getBusinessData = () => {
    fetch(`${APIURL}/business`, {
      method: "GET",

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((business) => {
        console.log(business);
        this.setState({
          businesses: business,
        });
      });
  };

  getCustomerData = () => {
    fetch(`${APIURL}/customers/${this.props.session.user?.customerId}`, {
      method: "GET",

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((customer) => {
        console.log(customer);
        this.setState({
          customer: customer[0],
        });
      });
  };
  deleteMembership = (id: number | undefined) => {
    fetch(`${APIURL}/memberships/${id}`, {
      method: "DELETE",

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.getCustomerData();
      });
  };

  addMembership = (id: number | undefined) => {
    fetch(`${APIURL}/memberships`, {
      method: "POST",
      body: JSON.stringify({
        customerId: this.props.session.user?.customerId,
        businessId: id,
      }),

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.getCustomerData();
      });
  };

  componentDidMount() {
    this.getCustomerData();
    this.getBusinessData();
  }

  render() {
    return (
      <div>
        <div>
          <Typography variant='h4'>
            {`Hello, ${this.state?.customer?.user?.firstName} ${this.state?.customer?.user?.lastName}!`}
          </Typography>
          <Typography variant='h5' style={{ marginTop: "50px" }}>
            You're currently enrolled in the following loyalty programs:
          </Typography>
          <div style={{ display: "flex" }}>
            {this.state?.customer &&
              this.state?.customer?.businesses?.map((data) => {
                return (
                  <LoyaltyCard
                    session={this.props.session}
                    business={data}
                    remove={this.deleteMembership}
                  />
                );
              })}
          </div>
        </div>
        <div>
          <Typography variant='h5' style={{ marginTop: "70px" }}>
            All Available Loyalty Programs:
          </Typography>
          <div style={{ display: "flex" }}>
            {this.state?.businesses &&
              this.state?.businesses.map((data) => {
                return (
                  <BusinessCard
                    session={this.props.session}
                    business={data}
                    add={this.addMembership}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDashboard;
