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
import AddCompany from "../components/AddCompany";

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

class Company extends Component {
  state = {
    companyList: [],
  };

  componentDidMount() {
    API.getCompany()
      .then((res) => this.setState({ companyList: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { classes } = this.props;

    if (this.state.companyList.length > 0) {
      return (
        <div>
          <div>
            <PageTitle title="Company Details " />
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "24px" }}
          >
            <AddCompany />
          </div>

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Company ID</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Company Domain</TableCell>
                  <TableCell>Company Type</TableCell>
                  <TableCell>Contact Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.companyList.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{row.companyDomain}</TableCell>
                    <TableCell>{row.companyType}</TableCell>
                    <TableCell>{row.contactName}</TableCell>
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
            <PageTitle title="Company Details" />
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

export default withStyles(styles)(Company);
