import dayjs from 'dayjs';
import sqlite from 'sqlite3'

const db = new sqlite.Database('./films.db', (err) => {
    if (err) throw err;
})

function Film(id, title, favorite=false, watch_date=undefined, rating=undefined , user_id=1){
    this.id = id;
    this.title = title;
    this.favorite = favorite
    this.watch_date = dayjs(watch_date);
    this.rating = rating;
    this.user_id = user_id;

    this.toString = () => {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.watch_date}, Rating: ${this.rating}, User id: ${this.user_id}`;
    }
}


function FilmLibrary(){
    // this.films = [];


    this.getFilms = () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films", (err, rows) => {
                if (err) reject([]);
                else if (rows.length === 0) resolve("Empty films table.");
                else {
                    const filmsArr = rows.map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                    resolve(filmsArr);
                }
            });
        });
    }

    this.getFavoriteFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE isFavorite=?";
            db.all(sql, [true], (err, rows) => {
                if (err) reject([]);
                else if (rows.length === 0) resolve("Empty films table");
                else{
                    const filmsArr = rows.map((film) => new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId));
                    resolve(filmsArr);
                }
            });
        });
    }

    this.getFilmsBefore = (date) => {
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

    this.searchFilmTitle = (substr) => {
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


    this.addFilm = (film) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO films VALUES(?, ?, ?, ?, ?, ?)";
            db.run(sql, [film.id, film.title, film.favorite, film.rating, film.watch_date, film.user_id], (err) => {
                if(err) reject(err);
                else resolve("Added.");
            });
        });
    }

    this.deleteFilmById = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM films WHERE id=?";
            db.run(sql, [id], (err) => {
                if(err) reject(err);
                else resolve(`Deleted film with id: ${id}`);
            });
        });
    }

    this.deleteAllWatchDates = () => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE films SET watchDate=?";
            db.run(sql, [null], (err) => {
                if (err) reject(err);
                else resolve("Deleted all watchDates");
            });
        })
    }
}

const filmLibrary = new FilmLibrary();
// const film1 = new Film(6, "title1", true, "2026-03-15", 2, 1);


filmLibrary.getFilms().then((message) => {
    console.log(message);
}).catch((reason) => {
    console.log(reason);
});

// filmLibrary.deleteAllWatchDates().then((message) => {
//     console.log(message);
// }).catch((reason) => {
//     console.log(reason);
// });