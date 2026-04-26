import { useActionState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";

export const FilmForm = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const filmId = Number(id); // Converti subito in numero
  const filmToEdit = props.filmList?.find(f => f.id === filmId);

  const handleSubmit = async (prevState, formData) => {
    const film = Object.fromEntries(formData.entries());

    if (film.title.trim() === "") {
      film.error = "Title cannot be empty!";
      film.watch_date = dayjs(film.watch_date);
      return film;
    }

    if (props.handleAddNewFilm)
      props.handleAddNewFilm(film);
    else
      props.updateFilm({ id: Number(id), ...film });

    navigate("/");
    return initialState;
  }

  const initialState = {
    "title": filmToEdit ? filmToEdit.title : "",
    "favorite": filmToEdit ? filmToEdit.favorite : false,
    "watch_date": filmToEdit ? dayjs(filmToEdit.watch_date) : dayjs(),
    "rating": filmToEdit ? filmToEdit.rating : 0
  };

  const [formState, formAction] = useActionState(handleSubmit, initialState);

  return (
    <>
      {formState.error && <Alert variant="secondary">{formState.error}</Alert>}

      <Form action={formAction}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" defaultValue={formState.title} required={true} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFavorite">
          <Form.Check name="favorite" type="checkbox" label="Favorite" defaultChecked={formState.favorite} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWatchDate">
          <Form.Label>Watch Date</Form.Label>
          <Form.Control name="watch_date" type="date" max={dayjs().format("YYYY-MM-DD")} defaultValue={formState.watch_date.format("YYYY-MM-DD")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control name="rating" type="number" defaultValue={formState.rating} min={0} max={5} />
        </Form.Group>

        {props.handleAddNewFilm && <Button variant="primary" type="submit">Submit</Button>}
        {props.filmList && <Button variant="success" type="submit">Edit</Button>}

      </Form>
    </>
  );
};
