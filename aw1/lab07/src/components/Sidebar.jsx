import { Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";

export const Sidebar = (props) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Col xs={2} className="bg-light vh-100">
      <h3 className="mt-2">Filters</h3>
      <ButtonGroup vertical className="w-100">
        {props.filters.map((filter, idx) => (
          <ToggleButton
            key={idx}
            className="my-1"
            id={`filter-${filter.name}`}
            type="radio"
            variant="outline-primary"
            checked={params.get("filter") ? params.get("filter") === filter.name : filter.name === "All"}
            onClick={() => {navigate("/?filter="+filter.name)}}
          >
            {filter.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Col>
  );
};