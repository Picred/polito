import { Container, Navbar, Form, Row, Col} from 'react-bootstrap'

export const MyNavbar = () => {
    return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <FilmLibraryLogo /> 
               
        <Navbar.Brand href="#home">Film Library</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
          <SearchForm/>
          <UserLogo/>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

const FilmLibraryLogo = () => {
  return (
    <i className="bi bi-collection-play fs-4 text-white me-2" />
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
      <i className="bi bi-person-circle text-white fs-3"/>
    </button>
  );
};