import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../css/register.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        J-CARD Brewery
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
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
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      userId: this.state.userId,
      password: this.state.password,
      password2: this.state.password2,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    this.props.registerUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <div className='m-t-12 flex justify-center'>
        {/* <CssBaseline /> */}
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <div className="form-field-margin">
                <label htmlFor="userId">User ID</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.userId}
                  error={errors.userId}
                  id="userId"
                  type="text"
                  autoFocus
                />
                 <br/>
                <span className="red-text">
                  {errors.userId}
                </span>
              </div>
              <div className="form-field-margin">
                <label htmlFor="password">First Name</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="firstName"
                />          
                 <br/>
                <span className="red-text">
                  {errors.firstName}
                </span>                      
              </div>
              <div className="form-field-margin">
                <label htmlFor="password">Last Name</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="lastName"
                  className={classnames("", {
                    invalid: errors.lastName
                  })}
                />   
                <br/>
                <span className="red-text">
                  {errors.lastName}
                </span>                             
              </div>
              <div className="form-field-margin">
                <label htmlFor="password">Password</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />      
                <br/>
                <span className="red-text">
                  {errors.password}
                </span>                          
              </div>
              <div className="form-field-margin">
                <label htmlFor="password2">Confirm Password</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />    
                <br/>
                <span className="red-text">
                  {errors.password2}
                </span>                            
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Have an account?
                </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerUser }) (withStyles(styles)(Login));