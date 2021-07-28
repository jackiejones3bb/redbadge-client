import { Button, Divider, IconButton, Paper } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { Business, Session } from "../models/models";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Container from "@material-ui/core/Container";

interface Props {
  session: Session;
  business: Business;
  remove(id: number): any;
}

class LoyaltyCard extends Component<Props> {
  render() {
    return (
      <Card style={{ marginRight: "20px", marginTop: "30px", width: "450px" }}>
        <CardContent style={{ padding: "30px" }}>
          <div>
            <Typography variant='h5' color='primary'>
              {this.props.business.name}
              <Button
                style={{ marginLeft: "20px" }}
                onClick={() =>
                  this.props.remove(this.props.business?.memberships?.id ?? 0)
                }
              >
                <IconButton aria-label='delete' >
                  <DeleteOutlineIcon />
                </IconButton>
              </Button>
            </Typography>
          </div>
          <Typography variant='h6' gutterBottom>
            {this.props.business.loyalty_program?.name}
          </Typography>
          <Typography gutterBottom>
            You have {this.props.business.memberships?.numPunches} punches
          </Typography>

          <Typography>
            Total punches needed for next reward:{" "}
            {this.props.business.loyalty_program?.numOfPunches}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default LoyaltyCard;
