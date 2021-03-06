import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0ba360 ",
    },
    secondary: {
      main: "#0ba360 ",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
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
  register: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn({ login, isAuthenticated }) {
  const classes = useStyles();

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit called");
    login(email, password);
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
            Sign in
          </Typography>

          <ValidatorForm
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            onError={(errors) => console.log(errors)}>
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
              autoFocus
              value={formData.email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign In
            </Button>
            <Box className={classes.register}>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </ValidatorForm>
        </div>
      </ThemeProvider>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(SignIn);
