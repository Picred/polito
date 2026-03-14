import dayjs from 'dayjs';


export function Film(id, title, favorite=false, watch_date=undefined, rating=undefined , user_id=1){
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
