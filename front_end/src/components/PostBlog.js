import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Form from "react-bootstrap/Form";
import Container from "@material-ui/core/Container";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../css/postblog.css";
import { connect } from "react-redux";
import { addPost, postAgain } from "../actions/post";

import {
  faNewspaper,
  faEdit,
  faArrowRight,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import EditIcon from "@material-ui/icons/Edit";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage: "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)",
  },
});

const useCardStyle = makeStyles({
  root: {
    minWidth: 275,
    //border: "1px solid",
    backgroundImage:
      "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)",
    //backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
    boxShadow: "0 0 8px black",
    marginBottom: "20px",
  },

  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 8,
    color: "#0ba360",
  },
  headerPos: {
    marginBottom: 16,
  },
  bodyFont: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "16px",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <EditIcon />,
    2: <SpellcheckIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  // mainBackground: {
  //   backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
  // },
  root: {
    width: "100%",
  },
  back: {
    marginRight: theme.spacing(3),
    fontWeight: "bold",
  },
  button: {
    marginRight: theme.spacing(1),
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  container: {
    marginBottom: theme.spacing(4),
  },
  postHeader: {
    color: "#0ba360",
    paddingTop: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Write Blog here", "Checkout Blog and Post"];
}

const PostBlog = ({ addPost, postedSuccessfully, postAgain }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const cardClasses = useCardStyle();

  const [blogTitle, setBlogTitle] = React.useState("");
  const [blogBody, setBlogBody] = React.useState("");
  const postBlog = () => {
    addPost(blogTitle, blogBody);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Container maxWidth="md">
            <Form>
              <Form.Group>
                <Form.Label>
                  <Typography variant="h6">
                    <FontAwesomeIcon className="mx-3" icon={faNewspaper} />
                    Blog Title
                  </Typography>
                </Form.Label>
                <Form.Control
                  placeholder="Blog Title"
                  onChange={(event) => setBlogTitle(event.target.value)}
                  value={blogTitle}
                />
                <Form.Text className="text-muted">
                  Write suitable Blog title related to your post.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  <Typography variant="h6">
                    <FontAwesomeIcon className="mx-3" icon={faEdit} />
                    Blog Body
                  </Typography>
                </Form.Label>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Enter Blog body"
                  rowsMin="7"
                  value={blogBody}
                  onChange={(event) => setBlogBody(event.target.value)}
                  className="form-control"
                />
                <Form.Text className="text-muted">
                  Write suitable Blog Body in around 300-400 words.
                </Form.Text>
              </Form.Group>
            </Form>
          </Container>
        );
      case 1:
        return (
          <Container maxWidth="md">
            <Typography
              gutterBottom
              className="checkoutHeader"
              variant="h4"
              component="h5"
              align="center">
              Checkout your blog content and Post it
            </Typography>
            <Card className={cardClasses.root} variant="outlined">
              <CardContent>
                <Typography
                  className={(cardClasses.title, cardClasses.pos)}
                  color="textSecondary">
                  Title
                </Typography>
                <Typography
                  variant="h5"
                  className={cardClasses.headerPos}
                  component="h2">
                  {blogTitle}
                </Typography>
                <Typography
                  className={cardClasses.pos}
                  gutterBottom
                  color="textSecondary">
                  Body
                </Typography>
                <Typography
                  variant="body2"
                  className={cardClasses.bodyFont}
                  component="p">
                  {blogBody}
                </Typography>
              </CardContent>
            </Card>
          </Container>
        );
      default:
        return "Unknown step";
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (postedSuccessfully) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div style={{ backgroundColor: "#f7f7f7" }} className="pb-3">
        <div className="wow animate__animated animate__flip">
          <Typography
            className={classes.postHeader}
            component="h1"
            variant="h2"
            align="center">
            Post Blog
          </Typography>
        </div>
        <Container className={classes.container}>
          <div className={classes.root}>
            <Stepper
              style={{ backgroundColor: "#f7f7f7" }}
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Grid container justify="center">
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        size="large"
                        variant="outlined"
                        className={classes.back}>
                        <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                        Back
                      </Button>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          size="large"
                          onClick={postBlog}
                          disabled={
                            blogTitle.length < 0 || blogBody.length < 100
                          }
                          className={classes.button}>
                          Post
                          <FontAwesomeIcon className="ml-2" icon={faCheck} />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleNext}
                          disabled={
                            blogTitle.length < 5 || blogBody.length < 100
                          }
                          className={classes.button}>
                          Next
                          <FontAwesomeIcon
                            className="ml-2"
                            icon={faArrowRight}
                          />
                        </Button>
                      )}
                    </Grid>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  postedSuccessfully: state.post.postedSuccessfully,
});

PostBlog.propTypes = {
  addPost: PropTypes.func.isRequired,
  postedSuccessfully: PropTypes.bool.isRequired,
  postAgain: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addPost, postAgain })(PostBlog);
