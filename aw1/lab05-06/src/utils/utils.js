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