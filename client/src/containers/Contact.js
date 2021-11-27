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
import AddContact from "../components/AddContact";

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

class Contact extends Component {
  state = {
    contactList: [],
  };

  componentDidMount() {
    API.getContact()
      .then((res) => this.setState({ contactList: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { classes } = this.props;

    if (this.state.contactList.length > 0) {
      return (
        <div>
          <div>
            <PageTitle title="Contact " />
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "24px" }}
          >
            <AddContact />
          </div>

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell> FirstName</TableCell>
                  <TableCell>LastName </TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell> Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.contactList.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.contactFirstName}</TableCell>
                    <TableCell>{row.contactLastName}</TableCell>
                    <TableCell>{row.contactAccountName}</TableCell>
                    <TableCell>{row.contactEmail}</TableCell>
                    <TableCell>{row.contactNumber}</TableCell>
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
            <PageTitle title="Contact" />
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "24px" }}
          >
            <AddContact />
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

export default withStyles(styles)(Contact);
