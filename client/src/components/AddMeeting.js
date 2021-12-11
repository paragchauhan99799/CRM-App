import React,{Component} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../css/register.css';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { registerMeeting } from "../actions/authActions";
import PropTypes from "prop-types";
//import axios from "axios";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height:`450px`,
    overflow: "scroll"
  };
}

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1544797718/photos/234002_original.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    position: 'absolute',
    borderRadius: '4px',
    width: 400,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class AddMeeting extends Component {
  constructor() {
    super();
    this.state = {
       open:false,
       formData:{
        title: "",
        host: "",
        participants: "",
        startTime: "",
        endTime: "",
        errors: {}
       },
       modalStyle: getModalStyle(),
       
    };
  }

   handleOpen = () => {
    this.setState({open:true});
  };

   handleClose = () => {
    this.setState({ open: false});
  };

   onChange = (e) => {
    const formData= this.state.formData;
    formData[e.target.id]= e.target.value;
    this.setState({formData:{...formData}});
  };

   onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
        title: this.state.formData.title,
        host: this.state.formData.host,
        participants: this.state.formData.participants,
        startTime: this.state.formData.startTime,
        endTime: this.state.formData.time
      
    };
    await this.props.registerMeeting(userData);
    if(this.props.fetchMeeting) {
      this.props.fetchMeeting();
    }
    this.handleClose();
  };
  render(){
    const handleOpen = this.handleOpen;
    const modalStyle = this.state.modalStyle;
    const open = this.state.open;
    const handleClose = this.handleClose;
    const onChange = this.onChange;
    const onSubmit= this.onSubmit;
    const { classes } = this.props;

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} color="primary">
        Add Meeting
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
            <Typography component="h1" variant="h5">
                Add Meeting
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => { onSubmit(e) }}>
                <div className="form-field-margin">
                    <label htmlFor="title">Title</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.title}
                        error={this.state.formData.errors.title}
                        id="title"
                        type="text"
                        autoFocus
                    />
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.title}
                    </span>
                </div>
                <div className="form-field-margin">
                    <label htmlFor="host">Host</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.host}
                        error={this.state.formData.errors.host}
                        id="host"
                        type="host"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.host}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="participants">Participants</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.participants}
                        error={this.state.formData.errors.participants}
                        id="participants"
                        type="participants"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.participants}
                    </span>                      
                </div>
                <div className="form-field-margin call-date-box">
                    <label htmlFor="startTime">Start Time</label>
                    <TextField
                      id="startTime"
                      variant="outlined"
                      type="datetime-local"
                      onChange={onChange}
                      defaultValue=""
                      value={this.state.formData.startTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br/>
                    <span className="red-text">
                        {this.state.formData.errors.startTime}
                    </span>  
                </div>
                <div className="form-field-margin call-date-box">
                    <label htmlFor="endTime">End Time</label>
                    <TextField
                      id="endTime"
                      variant="outlined"
                      type="datetime-local"
                      onChange={onChange}
                      defaultValue=""
                      value={this.state.formData.endTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br/>
                    <span className="red-text">
                        {this.state.formData.errors.endTime}
                    </span>  
                </div>                    
               
                <br/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    Add New Meeting
                </Button>
            </form>
        </div>
      </Modal>
    </div>
  );
}
}
AddMeeting.propTypes = {
  registerMeeting: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  fetchMeeting: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerMeeting })(withStyles(styles)(AddMeeting));

