import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Session } from "../models/models";
import { updateAsExpression } from "typescript";
import { Link } from "react-router-dom";


const styles =  (theme: Theme) =>
  ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });

  interface Props extends WithStyles<typeof styles>{
    session: Session;
    clearSession(): any;
   }

class Navbar extends Component<Props> {
logout = () => {
  this.props.clearSession()
}
  render() {
      const { classes } = this.props;
    return (
        <AppBar position='static'>
          <Toolbar style={{ display: "flex", justifyItems: "end" }}>
            <div className={classes.title}></div>
            {
              this.props.session.token ? (<Button color='inherit' onClick={this.logout}>Logout</Button>
              ) : (<Link to='/login' style={{ textDecoration: "none" }}>
              <Button color='primary' style={{color: '#ffffff'}}>Login</Button>
              </Link>)
            }
          </Toolbar>
        </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
