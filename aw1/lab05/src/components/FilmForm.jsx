import { useActionState } from "react";
import { Alert, Form, Button} from "react-bootstrap";
import dayjs from "dayjs";

export const FilmForm = (props) => {
    const handleAddNewFilm = async (prevState, formData) => {
        const film = Object.fromEntries(formData.entries());

        if (film.title.trim() === ""){
            film.error = "Title cannot be empty!";
            film.watch_date = dayjs(film.watch_date);
            return film;
        }

        props.handleAddNewFilm(film);

        return initialState;
    }
    
    const initialState = {
        "title": "", 
        "favorite": false,
        "watch_date": dayjs(), 
        "rating": 0
    };

    const [formState, formAction] = useActionState(handleAddNewFilm, initialState);

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
            <Form.Control name="watch_date" type="date" defaultValue={formState.watch_date.format("YYYY-MM-DD")}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control name="rating" type="number" defaultValue={formState.rating} min={0} max={5}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        
    </Form>
    </>
    );
};
