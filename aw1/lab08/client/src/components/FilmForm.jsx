import { useActionState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { useNavigate, useParams, Link } from "react-router";

export const WrapperFilmForm = (props) => {
  const { filmId } = useParams();

  const film = props.filmList.filter((film) => film.id == filmId)[0];

  return(
    <FilmForm film={film} updateFilm={props.updateFilm}/>
  )
}

export const FilmForm = (props) => {
  const navigate = useNavigate();

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
      props.updateFilm({ id: props.film.id, ...film });

    navigate("/films");
  }

  const initialState = {
    "title": props.film?.title,
    "favorite": props.film?.favorite,
    "watch_date": props.film?.date ?? dayjs(),
    "rating": props.film?.rating
  };

  const [formState, formAction] = useActionState(handleSubmit, initialState);

  return (
    <>
      {formState.error && <Alert variant="secondary">{formState.error}</Alert>}

      <Form id={props.film?.id} action={formAction}>
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

        {props.handleAddNewFilm && <Button variant="primary" type="submit">Add</Button>}
        {props.film && <Button variant="success" type="submit">Edit</Button>}
        <Link to="/films" className="btn btn-danger m-2" variant="danger">Cancel</Link>

      </Form>
    </>
  );
};
