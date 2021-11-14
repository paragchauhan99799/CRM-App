import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../css/register.css';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    borderRadius: '4px',
    width: 400,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [ formData, setFormData ] = React.useState({
        companyName: "",
        companyDomain: "",
        companyType: "",
        contactName: "",
        contactNumber: "",
        errors: {}
    })
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = function(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
        companyName: formData.companyName,
        companyDomain: formData.companyDomain,
        companyType: formData.companyType,
        contactName: formData.contactName,
        contactNumber: formData.contactNumber,
    };
    console.log('Add Company', userData);
  };

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
                        value={formData.companyName}
                        error={formData.errors.companyName}
                        id="companyName"
                        type="text"
                        autoFocus
                    />
                        <br/>
                    <span className="red-text">
                        {formData.errors.companyName}
                    </span>
                </div>
                <div className="form-field-margin">
                    <label htmlFor="companyDomain">Company Domain</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={formData.companyDomain}
                        error={formData.errors.companyDomain}
                        id="companyDomain"
                        type="companyDomain"
                    />          
                        <br/>
                    <span className="red-text">
                        {formData.errors.companyDomain}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="companyType">Company Type</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={formData.companyType}
                        error={formData.errors.companyType}
                        id="companyType"
                        type="companyType"
                    />          
                        <br/>
                    <span className="red-text">
                        {formData.errors.companyType}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="contactName">Contact Name </label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={formData.contactName}
                        error={formData.errors.contactName}
                        id="contactName"
                        type="contactName"
                    />          
                        <br/>
                    <span className="red-text">
                        {formData.errors.contactName}
                    </span>                      
                </div>
                <div className="form-field-margin">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onChange}
                        value={formData.contactNumber}
                        error={formData.errors.contactNumber}
                        id="contactNumber"
                        type="contactNumber"
                    />          
                    <br/>
                    <span className="red-text">
                        {formData.errors.contactNumber}
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
