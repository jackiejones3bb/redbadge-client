import { Button, MenuItem, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { Paper } from "@material-ui/core";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Customer, Membership, rewardTypes, Session } from "../models/models";
import APIURL from "../lib/environment";

interface InitialState {
  customer?: Customer;
  membership?: Membership;
  customerId: number;
}

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  session: Session;
}

class CustomerDetails extends Component<Props, InitialState> {
  constructor(props: Props) {
    super(props);

    const customer_id = this.props.match.params.id;

    const id =
      customer_id === null || isNaN(parseInt(customer_id))
        ? 0
        : parseInt(customer_id);
    this.state = {
      customerId: id,
    };
  }

  handleUpdatePunches = (punch: number) => {
    let newPunches = (this.state.membership?.numPunches ?? 0) + punch;
    if (newPunches < 0) {
      newPunches = 0;
    }

    fetch(`${APIURL}/memberships/${this.state?.membership?.id}`, {
      method: "PUT",
      body: JSON.stringify({
        numPunches: newPunches,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response data: ", data);
        this.getMembershipData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCustomerData = () => {
    fetch(`${APIURL}/customers/${this.state.customerId}`, {
      method: "GET",

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((customer) => {
        console.log(customer);
        this.setState({ customer: customer[0] });
      });
  };

  getMembershipData = () => {
    fetch(`${APIURL}/memberships/get-details`, {
      method: "POST",
      body: JSON.stringify({
        customerId: this.state.customerId,
        businessId: this.props.session.user?.businessId,
      }),

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((membership) => {
        console.log(membership);
        this.setState({ membership: membership[0] });
      });
  };

  componentDidMount() {
    this.getCustomerData();
    this.getMembershipData();
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "25vw" }}>
          <div>{this.state.customer?.user?.lastName}</div>
          <div>{this.state.membership?.numPunches}</div>
          <div>
            <Button
              onClick={() => this.handleUpdatePunches(1)}
              variant='contained'
              color='primary'
              size='large'
              style={{ marginTop: "30px" }}
            >
              Add A Punch
            </Button>
          </div>
          <div>
            <Button
              onClick={() => this.handleUpdatePunches(-1)}
              variant='contained'
              color='primary'
              size='large'
              style={{ marginTop: "30px" }}
            >
              Delete A Punch
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(CustomerDetails);
