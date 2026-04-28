import dayjs from 'dayjs'

export const getFilmLastMonth = (filmList) => {
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();
    
    return filmList.filter(flim => {
        if(!flim.watch_date) return false;

        const d = dayjs(flim.watchDate);
        return d.isValid() && d.month() === currentMonth && d.year() === currentYear;
    })
}

export const filterFunctions = {
  "All": (films) => films,
  "Favorite": (films) => films.filter(film => film.favorite),
  "Best rated": (films) => films.filter(film => film.rating == 5),
  "Unseen": (films) => films.filter(film => !film.watch_date),
  "Seen last month": (films) => getFilmLastMonth(films),
}