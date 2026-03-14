import sqlite from 'sqlite3'
import { Film } from './models.mjs';
import dayjs from 'dayjs';

const db = new sqlite.Database('./films.db', (err) => {
    if (err) throw err;
})

export const listFilms = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films", (err, rows) => {
            if (err) reject([]);
            else if (rows.length === 0) resolve([]);
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
            if (err) reject([]);
            else if (rows.length === 0) resolve([]);
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



export const listFilmsBefore = (date) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films", (err, rows) => {
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
            db.all("SELECT * FROM films", (err, rows) => {
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


export const addFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO films VALUES(?, ?, ?, ?, ?, ?)";
        db.run(sql, [film.id, film.title, film.favorite, film.rating, film.watch_date, film.user_id], (err) => {
            if(err) reject(err);
            else resolve("Added.");
        });
    });
}

export const deleteFilmById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM films WHERE id=?";
        db.run(sql, [id], (err) => {
            if(err) reject(err);
            else resolve(`Deleted film with id: ${id}`);
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



