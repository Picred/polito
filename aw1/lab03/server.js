import express from "express"
import morgan from "morgan"
import { check, validationResult } from "express-validator";
import { listFavoriteFilms, listFilms, listFilmsUnseen, listFilmsInMonth, listMostRatedFilms, getFilm, createFilm, updateFilm, updateRatingFilm, updateFavoriteFilm, deleteFilm} from "./api.js";
import { validateFieldIsPositive } from "./validators.js"


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


server.get("/api/films/unseen", async (req, res) => {
    try{
        const films = await listFilmsUnseen();
        res.json(films);
    } catch {
        res.status(500).end();
    }
});

server.get("/api/films/:id", async (req, res) => {
    try{
        const film = await getFilm(req.params.id);
        res.json(film);
    } catch {
        res.status(500).end();
    }
});


server.post("/api/films", async (req, res) => {
    try{
        validateFieldIsPositive([req.body.favorite, req.body.rating, req.body.user_id]);
    } catch (e){
        res.status(422).json({error : e.message});
        return;
    }

    try{
        const result = await createFilm(req.body);
        res.json(result);
    }
    catch (e){
        res.status(500).json({error : e.message})
    }
});



server.put("/api/films/:id", [
    check("id").notEmpty()
], async (req, res) => {
    try{
        validateFieldIsPositive([req.body.favorite, req.body.rating, req.body.user_id]);
    } catch (e){
        res.status(422).json({error : e.message});
        return;
    }

    try{
        const result = await updateFilm(req.params.id, req.body);
        res.json(result);
    }
    catch (e){
        res.status(404).json({error : e.message})
    }
});



server.patch("/api/films/:id", [
    check("id").notEmpty()
], async (req, res) => {
    try{
        validateFieldIsPositive([req.body.rating]);
    } catch (e){
        res.status(422).json({error : e.message});
        return;
    }

    try{
        const result = await updateRatingFilm(req.params.id, req.body);
        res.json({new_rating: result});
    }
    catch (e){
        res.status(404).json({error : e.message})
    }
});




server.patch("/api/films/:id/favorite", [
    check("id").notEmpty()
], async (req, res) => {
    try{
        validateFieldIsPositive([req.body.favorite]);
    } catch (e){
        res.status(422).json({error : e.message});
        return;
    }

    try{
        const result = await updateFavoriteFilm(req.params.id, req.body);
        res.json({new_favorite_value: result});
    }
    catch (e){
        res.status(404).json({error : e.message})
    }
});




server.delete("/api/films/:id", [
    check("id").notEmpty()
], async (req, res) => {
    try{
        await deleteFilm(req.params.id);
        res.status(204).end();
    }
    catch (e){
        res.status(404).json({error : e.message})
    }
});





server.listen(port, () => {
    console.log(`Server linstening on port ${port}`);
});