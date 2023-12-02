import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>GameBoyMarcus</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/privacy-policy">
                <Nav.Link>Privacy Policy</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="content">
        {children}
      </Container>

      <footer className="footer">
        <Container>
          <span>&copy; {currentYear} GameBoyMarcus. All Rights Reserved.</span>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
