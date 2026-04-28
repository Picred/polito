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
import { FilmForm, WrapperFilmForm } from "./components/FilmForm"
import { Routes, Route } from "react-router";
import { MyLayout } from "./components/MyLayout";

export const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");


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


  const updateFilm = newFilm => {
    setFilmList(oldFilmList => {
      return oldFilmList.map(film => {
        if (film.id === newFilm.id)
          return new Film(film.id, newFilm.title, newFilm.favorite, newFilm.watch_date, newFilm.rating)
        else return film;
      });
    });

  }

  const updateFilter = (newFilter) => {
    setActiveFilter(newFilter);
  }

  const handleAddNewFilm = (film) => {
    //TODO: set userId to the current user before concat.
    film.id = filmList.length + 1;
    film.user_id = 3;
    setFilmList([...filmList, film]);
  }

  const handleDeleteFilm = (filmId) => {
    setFilmList((oldFilmList) => {
      return oldFilmList.filter((film) => film.id !== filmId)
    });
  }

  const toggleFavorite = (filmId) => {
    setFilmList((oldFilmList) => {
      return oldFilmList.map((film) => {
        if (film.id == filmId)
          return new Film(film.id, film.title, !film.favorite, film.watch_date, film.rating, film.user_id);
        else return film;
      });
    });
  }

  const updateRating = (filmId, newRating) => {
    setFilmList((oldFilmList) => {
      return oldFilmList.map((film) => {
        if (film.id == filmId)
          return new Film(film.id, film.title, film.favorite, film.watch_date, newRating, film.user_id);
        else return film;
      });
    });
  }

  return (
    <Routes>
      <Route element={<MyLayout />} >
        <Route path="/films" element={<Sidebar filters={filters} updateFilter={updateFilter} />}>
          <Route index element={<FilmTable filmList={filmList} handleDeleteFilm={handleDeleteFilm} toggleFavorite={toggleFavorite} updateRating={updateRating}/>} />
          <Route path="new" element={<FilmForm handleAddNewFilm={handleAddNewFilm} />} />
          
          <Route path=":filmId/edit" element={<WrapperFilmForm filmList={filmList} updateFilm={updateFilm} />} />
          
          {/* <Route path="*" element={ <NotFound/> } /> */}

        </Route>

        {/* <Row>
            <Sidebar
              filter={activeFilter}
              filters={filters}
              updateFilter={updateFilter}
            />

            <Col xs={10}>
              {activeFilter === "All" && <FilmTable activeFilter={activeFilter} filmList={filmList} />}
              {activeFilter === "Favorite" && <FilmTable activeFilter={activeFilter} filmList={filmList.filter(film => film.favorite)} />}
              {activeFilter === "Best rated" && <FilmTable activeFilter={activeFilter} filmList={filmList.filter(film => film.rating == 5)} />}
              {activeFilter === "Unseen" && <FilmTable activeFilter={activeFilter} filmList={filmList.filter(film => !film.watch_date)} />}
              {activeFilter === "Seen last month" && <FilmTable activeFilter={activeFilter} filmList={getFilmLastMonth(filmList)} />}


              {filmFormDisplayMode === "addFilm" && <FilmForm handleAddNewFilm={handleAddNewFilm} />}
              {filmFormDisplayMode === "editFilm" && <FilmForm key={editableFilm.id} film={editableFilm} updateFilm={updateFilm} />}
            </Col>
          </Row>

          {filmFormDisplayMode === "hidden" && <Row><AddButton handleFilmFormDisplayMode={handleFilmFormDisplayMode} /></Row>} */}





      </Route>
    </Routes>
  );
};