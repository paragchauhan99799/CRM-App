import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../css/register.css';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { registerCall } from "../actions/authActions";
import PropTypes from "prop-types";
import axios from "axios";
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
class AddCall extends Component {
  constructor() {
    super();
    this.state = {
       open:false,
       formData:{
        owner: "",
        contactTo: "",
        type: "",
        status: "",
        time: "",
        subject: "",
        purpose: "",
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
        owner: this.state.formData.owner,
        contactTo: this.state.formData.contactTo,
        type: this.state.formData.type,
        status: this.state.formData.status,
        time: this.state.formData.time,
        subject: this.state.formData.subject,
        purpose: this.state.formData.purpose
    };
    const response = await this.props.registerCall(userData);
    console.log('response', response);
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
        Add Call
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
            <Typography component="h1" variant="h5">
                Add Call
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => { onSubmit(e) }}>
                <div className="form-field-margin">
                    <label htmlFor="owner">Owner</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.owner}
                        error={this.state.formData.errors.owner}
                        id="owner"
                        type="text"
                        autoFocus
                    />
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.owner}
                    </span>
                </div>
                <div className="form-field-margin">
                    <label htmlFor="contactTo">Contact To</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.contactTo}
                        error={this.state.formData.errors.contactTo}
                        id="contactTo"
                        type="contactTo"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.contactTo}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="type">Type</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.type}
                        error={this.state.formData.errors.type}
                        id="type"
                        type="type"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.type}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="status">Status</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.status}
                        error={this.state.formData.errors.status}
                        id="status"
                        type="status"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.status}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="time">Time</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.time}
                        error={this.state.formData.errors.time}
                        id="time"
                        type="time"
                    />          
                    <br/>
                    <span className="red-text">
                        {this.state.formData.errors.time}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="time">Subject</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.subject}
                        error={this.state.formData.errors.subject}
                        id="subject"
                        type="subject"
                    />          
                    <br/>
                    <span className="red-text">
                        {this.state.formData.errors.subject}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="purpose">Purpose</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.purpose}
                        error={this.state.formData.errors.purpose}
                        id="purpose"
                        type="purpose"
                    />          
                    <br/>
                    <span className="red-text">
                        {this.state.formData.errors.purpose}
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
                    Add New Call
                </Button>
            </form>
        </div>
      </Modal>
    </div>
  );
}
}
AddCall.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerCall })(withStyles(styles)(AddCall));

