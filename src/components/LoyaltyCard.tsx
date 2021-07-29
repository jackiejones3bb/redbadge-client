import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Component } from "react";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Business, Session } from "../models/models";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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
          <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: "-42px" }}>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() =>
                this.props.remove(this.props.business?.memberships?.id ?? 0)
              }
            >
              <Tooltip title="Delete Membership">
              <IconButton aria-label='delete'>
                <DeleteOutlineIcon style={{ fontSize: 40 }} />
              </IconButton>
              </Tooltip>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default LoyaltyCard;
