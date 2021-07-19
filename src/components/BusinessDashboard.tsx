import { Button, Divider } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Business, Session } from "../models/models";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SearchIcon from "@material-ui/icons/Search";
import APIURL from "../lib/environment";

interface Props extends RouteComponentProps {
  session: Session;
}

class BusinessDashboard extends Component<Props, Business> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      userId: 0
    };
  }

  getBusinessData = () => {
    fetch(`${APIURL}/business/${this.props.session.user?.businessId}`, {
      method: "GET",
      
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.session.token
      }),
    })
      .then((response) => response.json())
      .then((business) => {
        console.log(business);
        this.setState(business[0])
        
      });
  }

  componentDidMount() {
    this.getBusinessData();
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src='/img/line-dog.png'
            alt='dog drawing'
            style={{ height: "200px", marginBottom: "50px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <Typography variant='h3'>{`Welcome, ${this.state.name}!`}</Typography>
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
            <Link to={`/business/loyalty-form/${this.state.loyalty_program?.id ?? 0}`} style={{ textDecoration: "none" }} >
            <Card style={{ margin: "10px", marginRight: "100px" }}>
              <CardContent
                style={{ padding: "40px", justifyContent: "center" }}
              >
                <Typography variant='h5' gutterBottom color='primary'>
                  {this.state.loyalty_program ? `UPDATE YOUR LOYALTY PROGRAM` : `CREATE A LOYALTY PROGRAM`}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <AddCircleOutlineOutlinedIcon
                    color='primary'
                    style={{ fontSize: 70 }}
                  />
                </div>
              </CardContent>
            </Card>
            </Link>

            <Divider orientation='vertical' flexItem />
            <Link to={`/customer/search`} style={{ textDecoration: "none" }} >
            <Card style={{ margin: "10px", marginLeft: "100px" }}>
              <CardContent
                style={{ padding: "40px", justifyContent: "center" }}
              >
                <Typography variant='h5' gutterBottom color='primary'>
                  SEARCH FOR A CUSTOMER
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <SearchIcon color='primary' style={{ fontSize: 70 }} />
                </div>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        </Grid>

        <Link
          to='/'
          style={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          <Button variant='outlined' color='primary' size='large'>
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }
}

export default withRouter(BusinessDashboard);
