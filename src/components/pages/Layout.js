import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" className="bg-body-tertiary">
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

      <main>
        <Container fluid className="content">
          {children}
        </Container>
      </main>

      <footer className="footer mt-auto py-3 bg-light">
        <Container>
          <span>&copy; {currentYear} GameBoyMarcus. All Rights Reserved.</span>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
