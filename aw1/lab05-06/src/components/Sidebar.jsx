import { Col, ButtonGroup, ToggleButton } from "react-bootstrap";

export const Sidebar = (props) => {
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
                            value={filter.name}
                            checked={props.filter === filter.name}
                            onChange={(e) => props.updateFilter(e.currentTarget.value)}
                        >
                            {filter.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
        </Col>
    );
};