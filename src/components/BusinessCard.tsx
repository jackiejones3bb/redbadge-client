import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Component } from "react";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
          <div style={{display: "flex", justifyContent: "start", marginLeft: "-22px"}}>
            <Button onClick={() => this.props.add(this.props.business.id)} >
              <Tooltip title="Add Membership" placement="top">
              <IconButton aria-label='add' >
                <AddCircleOutlineIcon style={{fontSize: 40 }} />
              </IconButton>
              </Tooltip>
            </Button>
          </div>
          <div>
            <Typography variant='h5' color='primary'>
              {this.props.business.name}
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
