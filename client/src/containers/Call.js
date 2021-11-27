import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import API from "../utilities/api";
import PacmanLoader from "react-spinners/PacmanLoader";
import AddCall from "../components/AddCall";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 1000,
    minHeight: 500,
  },
});

class Call extends Component {
  state = {
    callList: [],
  };

  componentDidMount() {
    API.getCall()
      .then((res) => this.setState({ callList: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { classes } = this.props;

    if (this.state.callList.length > 0) {
      return (
        <div>
          <div>
            <PageTitle title="Call " />
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "24px" }}
          >
            <AddCall />
          </div>

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Owner </TableCell>
                  <TableCell>Contact To </TableCell>
                  <TableCell>Call Type</TableCell>
                  <TableCell>Call Start Time</TableCell>
                  <TableCell> Call Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.callList.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.contactTo}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <PageTitle title="Call" />
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "24px" }}
          >
            <AddCall />
          </div>
          <PacmanLoader
            className={"pacman-loader"}
            sizeUnit={"px"}
            size={75}
            color={"#313131"}
            loading={true}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(Call);
