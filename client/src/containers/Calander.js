import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import API from "../utilities/api";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; 
import '../css/calander.css'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCall from "../components/AddCall";
import AddMeeting from "../components/AddMeeting";
import { ThreeSixty } from "@material-ui/icons";
import moment from 'moment';

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

class Calendar extends Component {
  state = {
    callList: [],
    dateFilterList:[],
   // meetingList:[]
    
  };

  componentDidMount() {
    this.fetchCallDetails();
    //this.fetchMeetingDetails();
    
  }

  fetchCallDetails() {
    API.getCall()
    .then((res) => {
      let callList = res.data.map((data) => {
        data['date'] = data.time
        data['title'] = data.subject
        return data;
      });
      
      console.log('callList', callList);
      this.setState({ callList: callList })
    })
    .catch((err) => console.log(err));
  }

  fetchMeetingDetails() {
    API.getCall()
    .then((res) => {
      let meetingList = res.data.map((data) => {
        data['date'] = data.startTime
        data['title'] = data.title
        return data;
      });
      console.log('meetingList', meetingList);
      this.setState({ meetingList: meetingList })
    })
    .catch((err) => console.log(err));
  }

  dateClick(events) {
    console.log('event', events);
    moment(new Date('2021/12/04')).isSame(new Date('2021/12/05 01:30'), 'day')
    const ab = this.state.callList;
    const filterList = ab.filter((x)=>{
      if(moment(new Date(events.dateStr)).isSame(new Date(x.time), 'day')){
        return true;
      }
      return false;
    })
    console.log(filterList);
    this.setState({dateFilterList: filterList})
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{background: 'white'}}>
        <FullCalendar
          height='auto'
          plugins={[ interactionPlugin, dayGridPlugin ]}
          initialView="dayGridMonth"
          selectable='true'
          allDay='true'
          dateClick={this.dateClick.bind(this)}
          eventTimeFormat={{
            hour:'2-digit',
            minute: '2-digit',
            meridiem: false
          }}
          events={this.state.callList}        
        />
        <div className="cal-action-item">
           <AddCall fetchCall={this.fetchCallDetails.bind(this)} />
        </div>
       
        <div className="meeting-action-item">
           <AddMeeting fetchMeeting={this.fetchMeetingDetails.bind(this)} />
        </div>
        <div className="table-call">

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
                {this.state.dateFilterList.map((row) => (
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


        </div>
      </div>

     
    );
  }
}

export default withStyles(styles)(Calendar);
