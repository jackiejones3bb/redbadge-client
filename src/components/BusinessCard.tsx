import { Button, Divider, IconButton } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { Business, Session } from "../models/models";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

interface Props {
  session: Session;
  business: Business;
  add(id: number): any;
}

class BusinessCard extends Component<Props> {
  render() {
    return (
      <Card style={{ marginRight: "20px", marginTop: "30px", width: "450px" }}>
        <CardContent style={{ padding: "30px" }}>
          <div>
            <Typography variant='h5' color='primary'>
              {this.props.business.name}
              <Button
                style={{ marginLeft: "20px" }}
                onClick={() => this.props.add(this.props.business.id)}
              >
                <IconButton aria-label='add'>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Button>
            </Typography>
            <Typography>{this.props.business.street}</Typography>
            <Typography style={{ marginRight: "10px" }}>
              {`${this.props.business.city}, 
              ${this.props.business.state}  
               ${this.props.business.zip}`}
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default BusinessCard;
