import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";


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

  interface Props extends WithStyles<typeof styles>{ }

class Navbar extends Component<Props> {

  render() {
      const { classes } = this.props;
    return (
        <AppBar position='static'>
          <Toolbar style={{ display: "flex", justifyItems: "end" }}>
            <div className={classes.title}></div>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
