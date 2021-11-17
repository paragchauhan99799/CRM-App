/* eslint-disable no-script-url */

import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../components/Title";
import API from "../utilities/api";
import AddCompany from "../components/AddCompany";


export default function CompanyDetails() {
  // getProductInfo();
  const [companyList, setCompanyList] = useState([]);

  const getCompanyList = async() => {
    const res =await API.getCompany();
    console.log(res);
    setCompanyList(res.data);
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <React.Fragment>
          <div style={{"display": 'flex', 'justifyContent': 'end', 'margin': '24px' }}>
          <AddCompany />
        </div>
      <Title>Company Details</Title>
      <Table size="small">
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
          {companyList.map((row) => (
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
    </React.Fragment>
  );
}
