import { Table, Col } from "react-bootstrap";

export const FilmTable = (props) => {
    return (
        <Col xs={10}>
            <h3 className="mt-2">{props.activeFilter}</h3>
            <Table bordered hover responsive="sm">
                <tbody>
                    {props.filmList.map((film, idx) => (
                        <tr key={idx} className="align-middle">
                            <td>
                                <HearthIcon isFavorite={film.favorite}/>
                                {film.title}
                                
                            </td>

                            <td className="text-center">
                                {film.watch_date}
                            </td>

                            <td className="text-end text-nowrap">
                                <RatingStars filmId={film.id} rating={film.rating} maxStars={5} />
                                <EditButton/>
                                <DeleteButton/>
                            </td>
                        </tr>
                    ))}
            </tbody>
            </Table>
        </Col>
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
                    <button key={index} className="btn text-warning p-0" onClick={(e) => {console.log(`film_id: ${props.filmId} new_rating: ${index+1}`);}}>
                        <i className={`bi ${isFull ? "bi-star-fill" : "bi-star"}`} />
                    </button>
                );
            })}
        </span>
    );
};


const EditButton = () => {
    return (
        <button className="btn">
            <i className="bi bi-pencil"></i>
        </button>
    );
};


const DeleteButton = () => {
    return (
        <button className="btn">
            <i className="bi bi-trash"></i>
        </button>
    );
};