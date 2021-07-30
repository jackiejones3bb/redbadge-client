import { Button } from "@material-ui/core";
import { Component } from "react";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Customer, Membership, Session } from "../models/models";
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
        <Paper
          style={{
            display: "block",
            justifyContent: "center",
            margin: "40px",
            width: "25vw",
            padding: "40px",
          }}
        >
          <Typography variant="h4">
            {this.state.customer?.user?.firstName}{" "}
            {this.state.customer?.user?.lastName}
          </Typography>
          <Typography variant="h5" style={{marginTop: "20px"}}>
            Current number of punches: {this.state.membership?.numPunches}
          </Typography>
          <div style={{ display: "flex" }}>
            <div>
              <Button
                onClick={() => this.handleUpdatePunches(1)}
                variant='contained'
                color='primary'
                size='large'
                style={{ marginTop: "40px", marginRight: "10px" }}
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
                style={{ marginTop: "40px", marginRight: "10px" }}
              >
                Delete A Punch
              </Button>
            </div>
            <div>
            <Link to='/business/dashboard' style={{ textDecoration: "none", display: 'flex', justifyContent: 'center', marginTop: '40px', marginRight: "10px" }}>
              <Button variant='outlined' color='primary' size='large'>
                Cancel
              </Button>
            </Link>
            </div>
            
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(CustomerDetails);
