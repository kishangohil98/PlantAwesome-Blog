import React, { Fragment, useEffect } from "react";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts, postAgain } from "../actions/post";
import Container from "@material-ui/core/Container";
import PictureHeader from "../components/PictureHeader";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PostItem from "../components/PostItem";
//import { loadUser } from "../actions/auth";
import WOW from "wow.js";
const theme = createMuiTheme();

const useStyles = makeStyles({
  mainBackground: {
    backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
  },
  mainHeader: {
    color: "#0ba360",
    borderBottom: "1px solid #455A64",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    boxShadow: "0 8px 6px -6px #888888",
    backgroundImage: "linear-gradient(to top, #dfe9f3 0%, white 100%)",
    fontFamily: "Acme, sans-serif",
  },
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

const Home = ({
  auth: { authLoading },
  getPosts,
  postAgain,
  post: { posts, postLoading },
}) => {
  useEffect(() => {
    //add async if like doesn't show up
    //loadUser();
    getPosts();
    postAgain();
    new WOW().init();
  }, [getPosts, postAgain]);

  const classes = useStyles();

  return authLoading && postLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={classes.mainBackground}>
        <div id="pichead">
          <PictureHeader />
        </div>

        <Container>
          <div className={classes.root}>
            <Grid container direction="row" justify="center" spacing={10}>
              {posts.map((post) => (
                <Grid
                  className="wow animate__animated animate__fadeInUp"
                  item
                  xs={12}
                  md={6}>
                  <PostItem key={post.id} post={post} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postAgain: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getPosts, postAgain })(Home);
