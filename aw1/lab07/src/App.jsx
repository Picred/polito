import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import { MyNavbar } from "./components/MyNavbar";
import { Sidebar } from "./components/Sidebar";
import { Film } from "./types";
import { FilmTable } from "./components/FilmTable";
import { Container, Row } from "react-bootstrap";
import { getFilmLastMonth } from "./utils/utils";
import { AddButton } from "./components/AddButton";
import { Col } from "react-bootstrap";
import { FilmForm } from "./components/FilmForm"
import { Routes, Route } from "react-router";


{/* ROUTES:
    - / -> all films (index)
    - /films/new -> add new film
    - /films/edit/:id -> edit the film with id :id
    - /films?filter=something -> all films which satisfy the filter
    - * -> NotFound
    
    */ }


export const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filmFormDisplayMode, setFilmFormDisplayMode] = useState("hidden");
  const [editableFilm, setEditableFilm] = useState();


  const [filmList, setFilmList] = useState([
    new Film(1, "Pulp Fiction", true, "2024-03-10", 5),
    new Film(2, "21 Grams", true, "2024-03-17", 4),
    new Film(3, "Star Wars", false),
    new Film(4, "Matrix", false),
    new Film(5, "Shrek", false, "2024-03-21", 3)
  ]);

  const filters = [
    { name: "All" },
    { name: "Favorite" },
    { name: "Best rated" },
    { name: "Seen last month" },
    { name: "Unseen" },
  ];

  const toggleFavorite = filmId => {
    setFilmList(oldFilmList => {
      return oldFilmList.map( film => {
        if (film.id == filmId)
          return new Film(filmId, film.title, !film.favorite, film.watch_date, film.rating);
        else return film;
      });
    });
  }

  const updateRating = (filmId, newRating) => {
    setFilmList(oldFilmList => {
      return oldFilmList.map( film => {
        if (film.id == filmId)
          return new Film(filmId, film.title, film.favorite, film.watch_date, newRating);
        else return film;
      });
    });
  }


  const handleEditFilm = (film) => {
    setEditableFilm(film);
    setFilmFormDisplayMode("editFilm");
  }

  const updateFilm = newFilm => {
    setFilmList(oldFilmList => {
      return oldFilmList.map(film => {
        if (film.id === newFilm.id){
          return new Film(film.id, newFilm.title, newFilm.favorite, newFilm.watch_date, newFilm.rating)
        }
        else return film;
      });
    });
    setFilmFormDisplayMode("hidden");

  }

  const handleAddNewFilm = (film) => {
    setFilmFormDisplayMode("hidden");
    //TODO: set userId to the current user before concat.
    film.id = filmList.length + 1;
    film.user_id = 3; // change it
    setFilmList([...filmList, film]);
  }


  const handleFilmFormDisplayMode = mode => {
    setFilmFormDisplayMode(mode);
  }

  return (
    <div className="vh-100 d-flex flex-column overflow-y-scroll">
      <MyNavbar />
      <Container fluid>
        <Routes>
          <Route path="/" element={ 
            <>
              <Row>
                <Sidebar filters={filters}/>
                <Col xs={10}>
                  <FilmTable handleEditFilm={handleEditFilm} filmList={filmList} updateRating={updateRating} toggleFavorite={toggleFavorite}/>
                </Col>
              </Row>
            </>
          }> 
            <Route path="films/add" element={
              <Col xs={10}>
                <FilmForm handleAddNewFilm={handleAddNewFilm}/>
              </Col>
            } />
            <Route path="films/:id/edit" element={
              <Col xs={10}>
                <FilmForm key={editableFilm?.id} filmList={filmList} updateFilm={updateFilm}/>
              </Col>
            } />
          </Route>


          <Route path="*" element={<p>Not Found</p>} />

        </Routes>
          {filmFormDisplayMode === "hidden" && <Row><AddButton handleFilmFormDisplayMode={handleFilmFormDisplayMode} /></Row>}
          
          {/* <Col xs={10}>

            {filmFormDisplayMode === "addFilm" && <FilmForm handleAddNewFilm={handleAddNewFilm} />}
            {filmFormDisplayMode === "editFilm" && <FilmForm key={editableFilm.id} film={editableFilm} updateFilm={updateFilm} />}
          </Col> */}
          {/* </Row> */}

      </Container>
    </div>
  );
};