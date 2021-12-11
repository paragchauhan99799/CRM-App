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
import AddMeeting from "../components/AddMeeting";

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

class Meeting extends Component {
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
            <PageTitle title="Meeting " />
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "24px" }}
          >
            <AddMeeting />
          </div>

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Host </TableCell>
                  <TableCell>Participants </TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.callList.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.host}</TableCell>
                    <TableCell>{row.participants}</TableCell>
                    <TableCell>{row.startTime}</TableCell>
                    <TableCell>{row.endTime}</TableCell>
                 
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
            <PageTitle title="Meeting" />
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "24px" }}
          >
            <AddMeeting />
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

export default withStyles(styles)(Meeting);
