import { Col, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Outlet, useSearchParams } from "react-router";
import { Link } from "react-router";

export const Sidebar = (props) => {
  const [ searchParam ] = useSearchParams();
  let filter = searchParam.get("filter");

  filter = filter ? filter : "All";
  
  return (
    <Row>
      <Col xs={2} className="bg-light vh-100">
        <h3 className="mt-2">Filters</h3>
        <ButtonGroup vertical className="w-100">
          {props.filters.map((fi, idx) => (
            <Link to={`/films?filter=${fi.name}`}
              key={idx}
              className={`my-1 ${filter === fi.name ? "btn btn-primary" : "btn"}`}
              id={`filter-${fi.name}`}
              value={fi.name}
            >
              {fi.name}
            </Link >
          ))}
        </ButtonGroup>
      </Col>
      <Col xs={10}>
        <Outlet />
      </Col>
    </Row>
  );
};