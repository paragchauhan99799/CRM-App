import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import API from "../utilities/api";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; 
import '../css/calander.css'
import AddCall from "../components/AddCall";
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

class Contact extends Component {
  state = {
    callList: [],
  };

  componentDidMount() {
    this.fetchCallDetails();
  }

  fetchCallDetails() {
    API.getCall()
    .then((res) => {
      let callList = res.data.map((data) => {
        data['date'] = moment(data.time).format('YYYY-MM-DD HH:MM')
        data['title'] = data.subject
        return data;
      });
      console.log('callList', callList);
      this.setState({ callList: callList })
    })
    .catch((err) => console.log(err));
  }

  dateClick(events) {
    console.log('event', events)
  }

  render() {
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
      </div>
    );
  }
}

export default withStyles(styles)(Contact);
