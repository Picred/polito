import { Container, Navbar, Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';

export const MyNavbar = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <FilmLibraryLogo />
        <Navbar.Brand><Button onClick={() => { navigate("/"); }}>Film Library</Button></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">

          <SearchForm />
          <UserLogo />

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const FilmLibraryLogo = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => { navigate("/"); }}>
      <i className="bi bi-collection-play fs-4 text-white me-2" />
    </Button>
  );
};

const SearchForm = () => {
  return (
    <Form>
      <Row className='me-1'>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            data-bs-theme="light"
          />
        </Col>
      </Row>
    </Form>
  );
};


const UserLogo = () => {
  return (
    <button className='btn'>
      <i className="bi bi-person-circle text-white fs-3" />
    </button>
  );
};