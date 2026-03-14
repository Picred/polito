import express from "express"
import morgan from "morgan"
import { listFavoriteFilms, listFilms, listFilmsBefore, listFilmsInMonth, listMostRatedFilms} from "./api.js";

const server = express();
const port = 8080;

server.use(express.json());
server.use(morgan("dev"));


server.get("/api/films", async (req, res) => {
    try{
        const films = await listFilms();
        res.json(films);
    } catch {
        res.status(500).end();
    }
});


server.get("/api/films/favorite", async (req, res) => {
    try{
        const films = await listFavoriteFilms();
        res.json(films);
    } catch {
        res.status(500).end();
    }
});


server.get("/api/films/most_rated", async (req, res) => {
    try{
        const films = await listMostRatedFilms();
        res.json(films);
    } catch {
        res.status(500).end();
    }
});


server.get("/api/films/seen_last_month", async (req, res) => {
    try{
        const films = await listFilmsInMonth();
        res.json(films);
    } catch {
        res.status(500).end();
    }
});






server.listen(port, () => {
    console.log(`Server linstening on port ${port}`);
});