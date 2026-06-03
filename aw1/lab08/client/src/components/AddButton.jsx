import { Col } from "react-bootstrap";
import { Link } from "react-router";

export const AddButton = () => {
    return (
        <Col className="fixed-bottom text-end">
            <Link to="new" className="btn">
                <i className="bi bi-plus-circle-fill text-primary display-4"></i>
            </Link>
        </Col>
    );
};