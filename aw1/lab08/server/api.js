import sqlite from "sqlite3"
import { Film } from "./models.mjs";
import dayjs from "dayjs";

const db = new sqlite.Database("./films.db", (err) => {
    if (err) throw err;
})

export const listFilms = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films", (err, rows) => {
            if (err) reject([]);
            else {
                const filmsArr = rows.map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                resolve(filmsArr);
            }
        });
    });
}

export const listFavoriteFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE isFavorite=?";
        db.all(sql, [true], (err, rows) => {
            if (err) reject(err);
            else{
                const filmsArr = rows.map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                resolve(filmsArr);
            }
        });
    });
}



export const listMostRatedFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE rating=?";
        db.all(sql, [5], (err, rows) => {
            if (err) reject([]);
            else if (rows.length === 0) resolve([]);
            else{
                const filmsArr = rows.map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                resolve(filmsArr);
            }
        });
    })
}


export const listFilmsInMonth = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films", (err, rows) => {
            if (err) reject("Something went wrong on db.");
            else if (rows.length === 0) resolve([]);
            else {
                const currentMonth = dayjs().month();
                const currentYear = dayjs().year();
                let filmsArr = rows.filter(row => {
                    if(!row.watchDate) return false;

                    const d = dayjs(row.watchDate);
                    return d.isValid() && d.month() === currentMonth && d.year() === currentYear;
                }).map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                resolve(filmsArr);
            }
        });
    });
}


export const listFilmsUnseen = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE watchDate IS NULL";
        db.all(sql, (err, rows) => {
            if (err) reject(err);
            else{
                const filmsArr = rows.map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                resolve(filmsArr);
            }
        });
    });
}


export const getFilm = (id) => {
    return new Promise ((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE id=?";
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else{
                resolve(new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId));
            }
        });
    });
}













export const listFilmsBefore = (date) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films";
        db.all(sql, (err, rows) => {
            if (err) reject("Something went wrong on db.");
            else if (rows.length === 0) resolve([]);
            else {
                let filmsArr = rows.filter(row => dayjs(row.watchDate).isBefore(dayjs(date)))
                                    .map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                resolve(filmsArr);
            }
        });
    });
}

export const searchFilmTitle = (substr) => {
    return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows) => {
            if (err) reject("Something went wrong on db.");
            else if (rows.length === 0) resolve([]);
            else {
                let filmsArr = rows.filter(row => row.title.toLowerCase().includes(substr.toLowerCase()))
                                    .map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                resolve(filmsArr);
            }
        });
    });
}


export const createFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO films(title, isFavorite, rating, watchDate, userId) VALUES(?, ?, ?, ?, ?)";
        db.run(sql, [film.title, film.favorite, film.rating, film.watch_date, film.user_id], function (err) {
            if(err) reject(err);
            else resolve(new Film(this.lastID, film.title, film.favorite, film.watch_date, film.rating, film.user_id));
        });
    });
}


export const updateFilm = (id, film) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET title=?, isFavorite=?, rating=?, watchDate=?, userId=? WHERE id=?";
        db.run(sql, [film.title, film.favorite, film.rating, film.watch_date, film.user_id, id], function (err) {
            if(err) reject(err);
            else if(this.changes === 1) resolve(new Film(id, film.title, film.favorite, film.watch_date, film.rating, film.user_id));
            else reject({message:`id ${id} doesn't exist on db.`})
        });
    });
}




export const updateRatingFilm = (id, film) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET rating=? WHERE id=?";
        db.run(sql, [film.rating, id], function (err) {
            if(err) reject(err);
            else if(this.changes === 1) resolve(film.rating);
            else reject({message:`id ${id} doesn't exist on db.`})
        });
    });
}



export const updateFavoriteFilm = (id, film) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET isFavorite=? WHERE id=?";
        db.run(sql, [film.favorite, id], function (err) {
            if(err) reject(err);
            else if(this.changes === 1) resolve(film.favorite);
            else reject({message:`id ${id} doesn't exist on db.`})
        });
    });
}



export const deleteFilm = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM films WHERE id=?";
        db.run(sql, [id], function (err) {
            if(err) reject(err);
            else if (this.changes === 1) resolve()
            else reject({message:`id ${id} doesn't exist on db.`})
        });
    });
}

export const deleteAllWatchDates = () => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET watchDate=?";
        db.run(sql, [null], (err) => {
            if (err) reject(err);
            else resolve("Deleted all watchDates");
        });
    })
}



