import React, { useEffect, Fragment } from "react";
import MycontentPicHead from "../components/MycontentPicHead";
import Spinner from "../components/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMyPosts, postAgain } from "../actions/post";
import MyPostItem from "../components/MyPostItem";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import WOW from "wow.js";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";

const avtarBgcolor = () => {
  var colors = [
    "red",
    "lime",
    "magenta",
    "orangered",
    "olive",
    "cyan",
    "purple",
    "indigo",
    "teal",
    "blue",
    "blueGrey",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
const useStyles = makeStyles((theme) => ({
  mainBackground: {
    backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: "25px",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  profileData: {
    // border: "1px solid black",
    textAlign: "center",
  },
  paper: {
    // maxWidth: 400,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(2),
  },
  noBlog: {
    color: "rgba(o,o,o,0.8)",
    marginBottom: theme.spacing(2),
  },
  postButton: {
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
    color: "#fff",
    marginBottom: theme.spacing(10),
  },
}));

const Mycontent = ({
  auth: { isAuthenticated, authLoading, user },
  getMyPosts,
  post: { mypost, postLoading },
}) => {
  useEffect(async () => {
    //add async if like doesn't show up
    await loadUser();
    getMyPosts();
    new WOW().init();
  }, [getMyPosts]);
  const classes = useStyles();
  const history = useHistory();
  const gotoPostblog = () => {
    history.push("/post-blog");
  };

  return !isAuthenticated && authLoading && postLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={classes.mainBackground}>
        <MycontentPicHead />
        <Container>
          <Paper className={classes.paper}>
            <Grid className={classes.profileData}>
              <Typography variant="h4" className="mb-2">
                Welcome to your Blog Profile
              </Typography>
              <Box
                alignItems="center"
                className="mb-1"
                justifyContent="center"
                display="flex">
                <Avatar
                  className={classes.large}
                  style={{ backgroundColor: avtarBgcolor() }}>
                  {user.firstname.charAt(0) + user.lastname.charAt(0)}
                </Avatar>
              </Box>
              <Typography className="mb-1" variant="h5">
                <FontAwesomeIcon className="mx-3" icon={faUser} />
                {user.firstname + " " + user.lastname}
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
          </Paper>
          {!postLoading && mypost.length === 0 ? (
            <Fragment>
              <Typography
                align="center"
                className={classes.noBlog}
                variant="h6">
                You have not Posted any Blog yet!!
                <FontAwesomeIcon className="mx-2" icon={faFrown} />
                <FontAwesomeIcon icon={faFrown} />
              </Typography>
              <Box alignItems="center" display="flex" justifyContent="center">
                <Button
                  onClick={gotoPostblog}
                  className={classes.postButton}
                  variant="contained"
                  justifyContent="center">
                  Post Blog
                </Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Grid container direction="row" justify="center" spacing={3}>
                {mypost.map((mypost) => (
                  <Grid
                    className="wow animate__animated animate__slideInUp"
                    item
                    xs={12}>
                    <MyPostItem key={mypost.id} post={mypost} />
                  </Grid>
                ))}
              </Grid>
            </Fragment>
          )}
        </Container>
      </div>
    </Fragment>
  );
};

Mycontent.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getMyPosts })(Mycontent);
