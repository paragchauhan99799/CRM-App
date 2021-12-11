import React, { Component } from "react";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "../css/register.css";

import Typography from "@material-ui/core/Typography";
import { registerProduct } from "../actions/authActions";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

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

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1544797718/photos/234002_original.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    position: "absolute",
    borderRadius: "4px",
    width: 400,
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      formData: {
        productName: "",
        quantity: "",
        cost: "",
        price: "",
        errors: {},
      },
      modalStyle: getModalStyle(),
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = (e) => {
    const formData = this.state.formData;
    formData[e.target.id] = e.target.value;
    this.setState({ formData: { ...formData } });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      productName: this.state.formData.productName,
      quantity: this.state.formData.quantity,
      cost: this.state.formData.cost,
      price: this.state.formData.price,
    };
    const response = await this.props.registerProduct(userData);
    console.log("response", response);
    this.handleClose();
  };
  render() {
    const handleOpen = this.handleOpen;
    const modalStyle = this.state.modalStyle;
    const open = this.state.open;
    const handleClose = this.handleClose;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" onClick={handleOpen} color="primary">
          Add Product
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add Product
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <div className="form-field-margin">
                <label htmlFor="productName">Name</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={onChange}
                  value={this.state.formData.productName}
                  error={this.state.formData.errors.productName}
                  id="productName"
                  type="text"
                  autoFocus
                />
                <br />
                <span className="red-text">
                  {this.state.formData.errors.productName}
                </span>
              </div>
              <div className="form-field-margin">
                <label htmlFor="quantity"> Quantity</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={onChange}
                  value={this.state.formData.quantity}
                  error={this.state.formData.errors.quantity}
                  id="quantity"
                  type="quantity"
                />
                <br />
                <span className="red-text">
                  {this.state.formData.errors.quantity}
                </span>
              </div>
              <div className="form-field-margin">
                <label htmlFor="cost">Cost</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={onChange}
                  value={this.state.formData.cost}
                  error={this.state.formData.errors.cost}
                  id="cost"
                  type="cost"
                />
                <br />
                <span className="red-text">
                  {this.state.formData.errors.cost}
                </span>
              </div>

              <div className="form-field-margin">
                <label htmlFor="price">Price</label>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={onChange}
                  value={this.state.formData.price}
                  error={this.state.formData.errors.price}
                  id="price"
                  type="price"
                />
                <br />
                <span className="red-text">
                  {this.state.formData.errors.price}
                </span>
              </div>
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add New Product
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
AddProduct.propTypes = {
  registerProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerProduct })(
  withStyles(styles)(AddProduct)
);
