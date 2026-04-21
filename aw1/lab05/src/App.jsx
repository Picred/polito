import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import { MyNavbar } from "./components/MyNavbar";
import { Sidebar } from "./components/Sidebar";
import { Film } from "./types";
import { FilmTable } from "./components/FilmTable";
import { Container, Row} from "react-bootstrap";
import { getFilmLastMonth } from "./utils/utils";
import { AddButton } from "./components/AddButton";
import { Col } from "react-bootstrap";
import { FilmForm } from "./components/FilmForm"

export const App = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [filmFormDisplayMode, setFilmFormDisplayMode] = useState("hidden");

    const [filmList, setFilmList] = useState([
        new Film(1, "Pulp Fiction", true, "2024-03-10", 5),
        new Film(2, "21 Grams", true, "2024-03-17", 4),
        new Film(3, "Star Wars", false),
        new Film(4, "Matrix", false),
        new Film(5, "Shrek", false, "2024-03-21", 3)
    ]);

    const filters = [
        { name: "All"},
        { name: "Favorite"},
        { name: "Best rated"},
        { name: "Seen last month"},
        { name: "Unseen"},
    ];

    const updateFilter = (newFilter) => {
        setActiveFilter(newFilter);
    }

    const handleAddNewFilm = (film) => {
        setFilmFormDisplayMode("hidden");
        //TODO: set userId to the current user before concat.
        film.id = filmList.length + 1;
        film.user_id = 3;
        setFilmList([...filmList, film]);
    }

    const handleEditFilm = (film) => {
        console.log(film);
    }

    const handleFilmFormDisplayMode = mode => {
        setFilmFormDisplayMode(mode);
    }
    
    return (
    <div className="vh-100 d-flex flex-column overflow-y-scroll">
        <MyNavbar />
        <Container fluid>
        <Row>
            <Sidebar
                filter={activeFilter}
                filters={filters} 
                updateFilter={updateFilter} 
            />
        <Col xs={10}>
            {activeFilter === "All" && <FilmTable handleEditFilm={handleEditFilm} activeFilter={activeFilter} filmList={filmList}/>}
            {activeFilter === "Favorite" && <FilmTable handleEditFilm={handleEditFilm} activeFilter={activeFilter} filmList={filmList.filter(film => film.favorite)}/>}
            {activeFilter === "Best rated" && <FilmTable handleEditFilm={handleEditFilm} activeFilter={activeFilter} filmList={filmList.filter(film => film.rating == 5)}/>}
            {activeFilter === "Unseen" && <FilmTable handleEditFilm={handleEditFilm} activeFilter={activeFilter} filmList={filmList.filter(film => !film.watch_date)}/>}
            {activeFilter === "Seen last month" && <FilmTable handleEditFilm={handleEditFilm} activeFilter={activeFilter} filmList={getFilmLastMonth(filmList)}/>}
        
            {filmFormDisplayMode==="addFilm" && <FilmForm handleAddNewFilm={handleAddNewFilm}/>}
        </Col>
        </Row>

        {filmFormDisplayMode==="hidden" && <Row><AddButton handleFilmFormDisplayMode={handleFilmFormDisplayMode}/></Row>}
        </Container>
    </div>
    );
};