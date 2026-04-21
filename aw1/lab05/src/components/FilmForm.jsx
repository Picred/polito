import { useActionState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Film } from "../types";


export const FilmForm = (props) => {
    const handleAddNewFilm = async (prevState, formData) => {
        props.handleAddNewFilm(new Film(0, formData.get("title"), formData.has("favorite"), formData.get("watch_date"), formData.get("rating")));

        return {
            title: formData.get("title"),
            favorite: formData.has("favorite"),
            watch_date: formData.get("watch_date"),
            rating: formData.get("rating")
        }
    }
    
    const [formState, formAction, isPending] = useActionState(handleAddNewFilm, {
        "title": "", 
        "favorite": false,
        "watch_date": "Watch Date", 
        "rating": 0
    });

    return (
    <>
    <h2>Add new Film</h2>
    <Form action={formAction}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" defaultValue={formState.title} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFavorite">
            <Form.Check name="favorite" type="checkbox" label="Favorite" defaultChecked={formState.favorite} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWatchDate">
            <Form.Label>Watch Date</Form.Label>
            <Form.Control name="watch_date" type="date" defaultValue={formState.watch_date}/>
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
