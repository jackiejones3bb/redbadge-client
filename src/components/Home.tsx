import { Button } from "@material-ui/core";
import { Component } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid
            item
            md={4}
            style={{ display: "flex", justifyContent: "start" }}
          >
            <img
              src='img/line-dog.png'
              alt='dog drawing'
              style={{ height: "375px" }}
            />
          </Grid>
          <Grid item md={8}>
            <img src='img/logo.png' alt='logo' style={{ width: "350px" }} />
            <Typography variant='h5' gutterBottom color='primary'>
              Welcome to loYOUlty, an easy-to-use streamlined platform that
              allows business owners to create and seamlessly manage customer
              loyalty programs, and customers to effortlessly track their
              rewards online.
            </Typography>
            <br></br>

            <Link to='/register' style={{ textDecoration: "none" }}>
              <Button variant='contained' color='primary' size='large'>
                Let's Get Started
              </Button>
            </Link>
            <Link to='/login' style={{ textDecoration: "none" }}>
              <Button
                variant='outlined'
                color='primary'
                size='large'
                style={{ marginLeft: 20 }}
              >
                Log In
              </Button>
            </Link>
          </Grid>
        </Grid>

        <div style={{ marginTop: "150px" }}>
          <Grid container>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              md={4}
            >
              <Card style={{ margin: "10px" }}>
                <CardContent style={{ padding: "40px" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src='img/tag.png'
                      alt='loyalty tag'
                      style={{ height: "100px", marginBottom: "40px" }}
                    />
                  </div>
                  <Typography variant='subtitle1' gutterBottom color='primary'>
                    Business Owners can easily create and manage customer loyaly
                    programs online. Customize your loyalty programs to meet the
                    specific requirements of your business.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card style={{ margin: "10px" }}>
                <CardContent style={{ padding: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src='img/phone.png'
                    alt='phone'
                    style={{ height: "100px", marginBottom: "40px" }}
                  />
                  </div>
                  <Typography variant='subtitle1' gutterBottom color='primary'>
                    No more clutter. Ditch the old paper punch cards that you
                    can never find at the bottom of your purse or stuffed in
                    your wallet. LoYOUlty is completely online!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card style={{ margin: "10px" }}>
                <CardContent style={{ padding: "40px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src='img/heart.png'
                    alt='heart in hand'
                    style={{ height: "100px", marginBottom: "40px" }}
                  />
                  </div>
                  <Typography variant='subtitle1' gutterBottom color='primary'>
                    Customers can sign up and track their rewards for all of
                    their participating favorite local businesses. Know exactly
                    when it's time to redeem your rewards for savings.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
