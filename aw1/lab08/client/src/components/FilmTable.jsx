import { Table, Row, Button } from "react-bootstrap";
import { AddButton } from "./AddButton";
import { useSearchParams, Link } from "react-router";
import { getFilmLastMonth, filterFunctions } from "../utils/utils";


export const FilmTable = (props) => {
  const [ searchParam ] = useSearchParams();
  let filter = searchParam.get("filter");

  filter = filter ? filter : "All";

  const filmList = filterFunctions[filter](props.filmList);
  return (
    <>
      <h3 className="mt-2">{filter}</h3>
      <Table bordered hover responsive="sm">
        <tbody>
          {filmList.map((film) => (
            <tr key={film.id} className="align-middle">
              <td>
                <HearthIcon toggleFavorite={() => props.toggleFavorite(film.id)} isFavorite={film.favorite} />
                {film.title}

              </td>

              <td className="text-center">
                {film.watch_date}
              </td>

              <td className="text-end text-nowrap">
                <RatingStars filmId={film.id} rating={film.rating} maxStars={5} updateRating={props.updateRating}/>
                <EditButton filmId={film.id} />
                <DeleteButton filmId={film.id} handleDeleteFilm={props.handleDeleteFilm}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row><AddButton /></Row>
    </>
  );
};

const HearthIcon = (props) => {
  return (
    <Button variant="link" className="border-0 shadow-none text-decoration-none" onClick={props.toggleFavorite}>
        <i className={`${props.isFavorite ? "bi bi-heart-fill text-danger" : "bi bi-heart text-dark"}`}></i>
    </Button>
  );
};

const RatingStars = (props) => {
  const { rating, maxStars = 5 } = props;
  return (
    <span>
      {[...Array(maxStars)].map((_, index) => {
        const isFull = index < rating;
        return (
          <Button key={index} variant="link" className="btn text-warning p-0 text-decoration-none border-0" onClick={() => props.updateRating(props.filmId, index + 1)}>
            <i className={`bi ${isFull ? "bi-star-fill" : "bi-star"}`} />
          </Button>
        );
      })}
    </span>
  );
};


const EditButton = (props) => {
  return (
    <Link to={`${props.filmId}/edit`} className="btn">
      <i className="bi bi-pencil"></i>
    </Link>
  );
};


const DeleteButton = (props) => {
  return (
    <Button className="btn-sm shadow-sm" variant="outline-danger" onClick={() => props.handleDeleteFilm(props.filmId)}>
      <i className="bi bi-trash"></i>
    </Button>
  );
};