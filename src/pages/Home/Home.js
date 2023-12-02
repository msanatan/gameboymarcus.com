import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '24rem' }}>
            <Card.Body>
              <Card.Title>Star Runner</Card.Title>
              <Card.Text>
                Take on the stars and all the enemies that come with it!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
