import { Col } from "react-bootstrap";

export const AddButton = (props) => {
    return (
        <Col className="fixed-bottom text-end">
            <button className="btn" onClick={props.handleFilmFormActiveVisibility}>
                <i className="bi bi-plus-circle-fill text-primary display-4"></i>
            </button>
        </Col>
    );
};