import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../css/register.css';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { registerCompany } from "../actions/authActions";
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
class AddCompany extends Component {
  constructor() {
    super();
    this.state = {
       open:false,
       formData:{
        companyName: "",
        companyDomain: "",
        companyType: "",
        contactName: "",
        contactNumber: "",
        errors: {}
       },
       modalStyle: getModalStyle(),
       
    };
  }

   handleOpen = () => {
    this.setState({open:true});
  };

   handleClose = () => {
    this.setState({open:false});
  };

   onChange = (e) => {
  
    const formData= this.state.formData;
    formData[e.target.id]= e.target.value;
    this.setState({formData:{...formData}});
  };

   onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
        companyName: this.state.formData.companyName,
        companyDomain: this.state.formData.companyDomain,
        companyType: this.state.formData.companyType,
        contactName: this.state.formData.contactName,
        contactNumber: this.state.formData.contactNumber,
    };
    console.log('Add Company', userData);
    this.props.registerCompany(userData);

  };
  render(){
    const handleOpen = this.handleOpen;
    const modalStyle =this.state.modalStyle;
    const open = this.state.open;
    const handleClose = this.handleClose;
    //const classes= this.state.classes;
    const onChange =this.onChange;
    const formData=this.state.formData;
    const onSubmit= this.onSubmit;
    const { classes } = this.props;

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} color="primary">
        Add Company
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
            <Typography component="h1" variant="h5">
                Add Company
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => { onSubmit(e) }}>
                <div className="form-field-margin">
                    <label htmlFor="companyName">Company Name</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.companyName}
                        error={this.state.formData.errors.companyName}
                        id="companyName"
                        type="text"
                        autoFocus
                    />
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.companyName}
                    </span>
                </div>
                <div className="form-field-margin">
                    <label htmlFor="companyDomain">Company Domain</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.companyDomain}
                        error={this.state.formData.errors.companyDomain}
                        id="companyDomain"
                        type="companyDomain"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.companyDomain}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="companyType">Company Type</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.companyType}
                        error={this.state.formData.errors.companyType}
                        id="companyType"
                        type="companyType"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.companyType}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="contactName">Contact Name </label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.contactName}
                        error={this.state.formData.errors.contactName}
                        id="contactName"
                        type="contactName"
                    />          
                        <br/>
                    <span className="red-text">
                        {this.state.formData.errors.contactName}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={this.state.formData.contactNumber}
                        error={this.state.formData.errors.contactNumber}
                        id="contactNumber"
                        type="contactNumber"
                    />          
                    <br/>
                    <span className="red-text">
                        {this.state.formData.errors.contactNumber}
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
                    Add New Company
                </Button>
            </form>
        </div>
      </Modal>
    </div>
  );
}
}
AddCompany.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerCompany })(withStyles(styles)(AddCompany));

