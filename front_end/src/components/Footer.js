import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://www.instagram.com/key_son_gohel/">
        Kishan Gohil <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",

    overflow: "hidden",
  },
  footer: {
    padding: theme.spacing(3, 2),
    backgroundImage: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
    textAlign: "center",
    width: "100%",

    color: "#fff",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="h6">Thank you for reaching out here.</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
