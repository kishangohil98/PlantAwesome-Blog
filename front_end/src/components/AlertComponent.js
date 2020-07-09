import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Icon, SnackbarContent } from "@material-ui/core";
import { clearSnackbar } from "../actions/alert";
import "../css/alert.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";

export default function AlertComponent() {
  const dispatch = useDispatch();

  const { msg, successSnackbarOpen, alertType } = useSelector(
    (state) => state.alert
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={successSnackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      aria-describedby="client-snackbar">
      {alertType === "success" ? (
        <SnackbarContent
          style={{ backgroundColor: "#4caf50" }}
          message={
            <span id="client-snackbar">
              <CheckCircleIcon className="mr-2" />
              {msg}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}></SnackbarContent>
      ) : (
        <SnackbarContent
          style={{ backgroundColor: "#f44336" }}
          message={
            <span id="client-snackbar">
              <InfoIcon className="mr-2" />
              {msg}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}>
              <CloseIcon />{" "}
            </IconButton>,
          ]}></SnackbarContent>
      )}
    </Snackbar>
  );
}
