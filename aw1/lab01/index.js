import dayjs from 'dayjs';

function Film(id, title, favorite=false, watch_date=undefined, rating=undefined , user_id=1){
    this.id = id;
    this.title = title;
    this.favorite = favorite
    this.watch_date = dayjs(watch_date);
    this.rating = rating;
    this.user_id = user_id;

    this.toString = () => {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.watch_date.format('MMM DD, YYYY')}, Rating: ${this.rating}, User id: ${this.user_id}`;
    }
}

function FilmLibrary(){
    this.films = [];

    this.addFilm = (film) => {
        this.films.push(film);
    }

    this.sortByDate = () => {
        return [...this.films].sort((a,b) => (a.watch_date.isAfter(b.watch_date)) ? 1 : -1);
    }

    this.sortByRating = () => {
        return [...this.films].sort((a,b) => a.rating- b.rating);
    }

    this.removeFilm = (id) => {
        this.films = this.films.filter(film => film.id !== id);
    }

    this.updateRating = (id, newRating) => {
        const filmToUpdate = this.films.find(film => film.id === id);
        if (filmToUpdate) {
            filmToUpdate.rating = newRating;
            return true;
        }
        console.warn(`Film con ID ${id} non trovato.`);
        return false;
    };
}

const filmLibrary = new FilmLibrary();

const film1 = new Film(1, "title1", true, "2026-03-15", 2, 1);
const film2 = new Film(2, "title2", false, "2026-03-11", 3, 1);
const film3 = new Film(3, "title2", false, "2026-02-11", 5, 1);
const film4 = new Film(4, "title2", true, "2026-06-11", 1, 1);

filmLibrary.addFilm(film1);
filmLibrary.addFilm(film2);
filmLibrary.addFilm(film3);
filmLibrary.addFilm(film4);

filmLibrary.updateRating(2, 1);
const sorted = filmLibrary.sortByRating();

sorted.forEach((film) => {
    console.log(film.toString());
})