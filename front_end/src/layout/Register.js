import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/auth";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0ba360",
    },
    secondary: {
      main: "#0ba360",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
  },
  login: {
    marginTop: theme.spacing(3),
  },
}));

function Register({ register, isAuthenticated }) {
  const classes = useStyles();

  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = formData;

  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit called");
    register({ firstname, lastname, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <ValidatorForm
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            onError={(errors) => console.log(errors)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  autoComplete="fname"
                  name="firstname"
                  variant="standard"
                  label="First Name"
                  fullWidth
                  id="firstName"
                  autoFocus
                  onChange={(e) => onChange(e)}
                  value={formData.firstname}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  autoComplete="lname"
                  name="lastname"
                  variant="standard"
                  label="Last Name"
                  fullWidth
                  id="lastName"
                  value={formData.lastname}
                  onChange={(e) => onChange(e)}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  label="Email Address"
                  onChange={(e) => onChange(e)}
                  name="email"
                  id="email"
                  value={email}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  autoComplete="email"
                  value={formData.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  label="Password"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  autoComplete="current-password"
                  onChange={(e) => onChange(e)}
                  value={formData.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify="center" className={classes.login}>
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </ThemeProvider>
    </Container>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
