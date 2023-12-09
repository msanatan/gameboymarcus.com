import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Container className="vh-100 d-flex flex-column px-0" fluid>
      {/* <Container fluid> */}
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

      <Row className="flex-grow-1">
        <Col lg={true}>
          {children}
        </Col>
      </Row>

      <Row>
        <Col lg={true}>
          <footer className="footer mt-auto py-3 bg-light">
            <span>&copy; {currentYear} GameBoyMarcus. All Rights Reserved.</span>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
