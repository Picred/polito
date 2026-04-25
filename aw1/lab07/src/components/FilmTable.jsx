import { Button, Table } from "react-bootstrap";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { getFilmLastMonth } from "../utils/utils";

const filterFunctions = {
  "All": (films) => films,
  "Favorite": (films) => films.filter(film => film.favorite),
  "Best rated": (films) => films.filter(film => film.rating === 5),
  "Unseen": (films) => films.filter(film => !film.watch_date),
  "Seen last month": (films) => getFilmLastMonth(films),
}


export const FilmTable = (props) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }

  const getFilteredFilms = () => {
    if(params.has("filter")){
      return filterFunctions[params.get("filter")](props.filmList);
    }
    else return props.filmList;
  }

  return (
    <>
      { params.has("filter") ?
        <h3 className="mt-2">{params.get("filter")}</h3> 
        : 
        <h3 className="mt-2">All</h3>
      }
      <Table bordered hover responsive="sm">
        <tbody>
          {getFilteredFilms().map((film) => (
            <tr key={film.id} className="align-middle">
              <td>
                <HearthIcon isFavorite={film.favorite} />
                {film.title}

              </td>

              <td className="text-center">
                {film.watch_date}
              </td>

              <td className="text-end text-nowrap">
                <RatingStars filmId={film.id} rating={film.rating} maxStars={5} />
                <EditButton handleEditFilm={() => { props.handleEditFilm(film); }} navigate={handleNavigate} filmId={film.id} />
                <DeleteButton />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Outlet/>
    </>
  );
};

const HearthIcon = (props) => {
  return (
    <>
      {props.isFavorite && <button className="btn">
        <i className="bi bi-heart-fill text-danger"></i>
      </button>
      }
      {!props.isFavorite && <button className="btn">
        <i className="bi bi-heart text-dark"></i>
      </button>}
    </>
  );
};

const RatingStars = (props) => {
  const { rating, maxStars = 5 } = props;
  return (
    <span>
      {[...Array(maxStars)].map((_, index) => {
        const isFull = index < rating;
        return (
          <button key={index} className="btn text-warning p-0" onClick={(e) => { console.log(`film_id: ${props.filmId} new_rating: ${index + 1}`); }}>
            <i className={`bi ${isFull ? "bi-star-fill" : "bi-star"}`} />
          </button>
        );
      })}
    </span>
  );
};


const EditButton = (props) => {
  return (
    <Button className="btn" variant="primary-outline" onClick={() => props.navigate("/films/" + props.filmId + "/edit")}>
      <i className="bi bi-pencil"></i>
    </Button>
  );
};


const DeleteButton = () => {
  return (
    <button className="btn">
      <i className="bi bi-trash"></i>
    </button>
  );
};