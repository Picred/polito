import { Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export const AddButton = (props) => {
  const navigate = useNavigate();
  return (
    <Col className="fixed-bottom text-end">
      <button className="btn" onClick={() => { props.handleFilmFormDisplayMode("addFilm"); navigate("/films/add"); }} >
        <i className="bi bi-plus-circle-fill text-primary display-4"></i>
      </button>
    </Col>
  );
};