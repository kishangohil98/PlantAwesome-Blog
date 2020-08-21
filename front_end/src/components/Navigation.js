import React, { Fragment, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../css/nav.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../actions/auth";
import {
  faLeaf,
  faSeedling,
  faAlignLeft,
  faPlusSquare,
  faSignOutAlt,
  faHome,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import WOW from "wow.js";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return "nav-link navButton px-3 mx-2 active";
  } else {
    return "nav-link navButton px-3 mx-2";
  }
};

const Navigation = ({
  history,
  logout,
  auth: { isAuthenticated, authLoading },
}) => {
  useEffect(() => {
    new WOW().init();
  }, []);
  const authLinks = (
    <Nav.Item>
      <a onClick={logout} href="#!" className={isActive(history, "/logout")}>
        <FontAwesomeIcon className="mx-2" icon={faSignOutAlt} />
        Log Out
      </a>
    </Nav.Item>
  );

  const guestLinks = (
    <Nav.Item>
      <Link to="/login" className={isActive(history, "/login")}>
        <FontAwesomeIcon className="mx-2" icon={faSignInAlt} />
        Log In
      </Link>
    </Nav.Item>
  );

  return (
    <>
      <Navbar
        fixed="top"
        sticky="top"
        expand="lg"
        className="navBar"
        variant="dark">
        <Container fluid="md">
          <Navbar.Brand
            href="/"
            className="logo animate__animated animate__bounce">
            <FontAwesomeIcon className="mx-2" icon={faLeaf} />
            <span className="navBrandText">
              <span className="first">Plant</span>
              <span className="second pl-2">AWESOME</span>
            </span>
            <FontAwesomeIcon className="mx-2" icon={faSeedling} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end ">
            <Nav activeKey="/">
              <Nav.Item>
                <Link to="/" className={isActive(history, "/")}>
                  <FontAwesomeIcon className="mx-2" icon={faHome} />
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/my-content"
                  className={isActive(history, "/my-content")}>
                  <FontAwesomeIcon className="mx-2" icon={faAlignLeft} />
                  My Blogs
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/post-blog"
                  className={isActive(history, "/post-blog")}>
                  <FontAwesomeIcon className="mx-2" icon={faPlusSquare} />
                  Post Blog
                </Link>
              </Nav.Item>
              {!authLoading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
//const NavigationWithRouter = withRouter(Navigation);

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logout })(Navigation));
