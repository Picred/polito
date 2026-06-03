import { Film } from "../types";

const SERVER_URl = "http://localhost:8080/api";


const listFilms = async () => {
    const response = await fetch(`${SERVER_URl}/films`, {
        credentials: "include"
    });

    if(response.ok){
        const films = await response.json();
        return films.map(f => new Film(f.id, f.title, f.favorite, f.watch_date, f.rating, f.user_id))
    }
    else throw new Error("Server connection error (listFilms.)");
};


const API = { listFilms };
export default API;