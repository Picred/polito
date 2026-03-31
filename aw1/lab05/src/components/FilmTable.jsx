import { Table, Row, Col } from 'react-bootstrap';

export const FilmTable = (props) => {
    return (
        <Col xs={9}>
            <h3 className='mt-2'>{props.activeFilter}</h3>
            <Table striped bordered hover>
                <tbody>
                    {props.filmList.map((film, idx) => (
                        <tr key={idx}>
                            <td>
                                <HearthIcon isFavorite={film.favorite}/>
                                {film.title}
                                
                            </td>

                            <td>
                                {film.watch_date}
                            </td>

                            <td className="text-end text-nowrap">
                                <RatingStars rating={film.rating} maxStars={5} />
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
        {props.isFavorite && <i className="bi bi-heart-fill text-danger pe-2"></i>}
        {!props.isFavorite && <i className="bi bi-heart text-dark pe-2"></i>}
        </>
    );
};

const RatingStars = (props) => {
    const { rating, maxStars = 5 } = props;
    return (
        <span className="text-warning"> 
            {[...Array(maxStars)].map((_, index) => {
                const isFull = index < rating;
                return (
                    <i key={index} className={`bi ${isFull ? 'bi-star-fill' : 'bi-star'}`}></i>
                );
            })}
        </span>
    );
};


const EditButton = () => {
    return (
        <button class="btn"><i class="bi bi-pencil"></i></button>
    );
};


const DeleteButton = () => {
    return (
        <button class="btn"><i class="bi bi-trash"></i></button>
    );
};