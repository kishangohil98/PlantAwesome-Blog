import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import dateformate from "dateformat";
import { addLike, removeLike } from "../actions/post";
import clsx from "clsx";
//dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const getInitials = (nameString) => {
  const fullName = nameString.split(" ");
  const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
  return initials.toUpperCase();
};

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
  root: {
    // maxWidth: 345,
    //backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    boxShadow: "0 0 3px black",
    "&:hover": {
      boxShadow: "0 0 10px black",
    },
  },
  avatar: {
    backgroundColor: { avtarBgcolor },
  },
  postTitle: {
    marginBottom: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      color: "#424242",
    },
  },
  dpostTitle: {
    "&:hover": {
      color: "#424242",
    },
  },

  readMore: {
    color: "orange",
    cursor: "pointer",
  },
  likeButton: {
    color: "red",
  },
  daction: {
    justifyContent: "flex-start",
  },
  dbackground: {
    backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    padding: 0,
  },
  dbody: {
    color: "rgba(0,0,0,0.8)",
  },
}));

const PostItem = ({
  auth,
  post: { _id, user, author, title, body, likes, date },
  addLike,
  removeLike,
}) => {
  const classes = useStyles();

  const checkLiked = () => {
    if (!auth.authLoading) {
      const authUser = auth.user._id;
      let checkLike = likes.some((like) => like.user === authUser);
      if (checkLike) {
        return true;
      } else {
        return false;
      }
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const likePost = () => {
    addLike(_id);
  };

  const descriptionElementRef = React.useRef(null);
  return (
    <Fragment>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              style={{ backgroundColor: avtarBgcolor() }}>
              {getInitials(author)}
            </Avatar>
          }
          action={
            <Tooltip
              TransitionComponent={Zoom}
              style={{ fontSize: "20px" }}
              title="This button is unimplemented">
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          }
          title={author}
          subheader={dateformate(date, "longDate")}
        />

        <CardContent onClick={handleClickOpen()}>
          <Typography variant="h5" className={classes.postTitle}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body.slice(0, 400) + "...."}
            <span className={classes.readMore}>Readmore</span>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {checkLiked() ? (
            <IconButton onClick={(e) => removeLike(_id)}>
              <Favorite className={classes.likeButton} />
            </IconButton>
          ) : (
            <IconButton onClick={likePost}>
              <FavoriteBorder />
            </IconButton>
          )}
          <Typography variant="body1">{likes.length + " "}Likes</Typography>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle
          disablePadding
          className={classes.dbackground}
          id="scroll-dialog-title">
          <CardHeader
            dividers
            avatar={
              <Avatar
                aria-label="recipe"
                style={{ backgroundColor: avtarBgcolor() }}>
                {getInitials(author)}
              </Avatar>
            }
            action={
              <IconButton onClick={handleClose} aria-label="settings">
                <CloseIcon />
              </IconButton>
            }
            title={author}
            subheader={dateformate(date, "longDate")}
          />
        </DialogTitle>
        <DialogTitle dividers>
          <Typography variant="h5" className={classes.dpostTitle}>
            {title}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.dbody}>
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={clsx(classes.daction, classes.dbackground)}>
          <CardActions disableSpacing>
            {checkLiked() ? (
              <IconButton onClick={(e) => removeLike(_id)}>
                <Favorite className={classes.likeButton} />
              </IconButton>
            ) : (
              <IconButton onClick={(e) => addLike(_id)}>
                <FavoriteBorder />
              </IconButton>
            )}
            <Typography variant="body1">{likes.length + " "}Likes</Typography>
          </CardActions>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
