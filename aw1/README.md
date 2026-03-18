# API Documentation

## List all films

URL: `/api/films`

HTTP Method: GET

Description: Retrieve all films.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs. In case of success, returns an array of films.

Response Body: 
```json
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 0,
    "watch_date": "2026-03-09",
    "rating": 5,
    "user_id": 1
  },
  ...
]
```

------------------------------------------------


## List all favorite films

URL: `/api/films/favorite`

HTTP Method: GET

Description: Retrieve all favorite films.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs. In case of success, returns an array of favorite films.

Response Body: 
```json
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "watch_date": "2026-03-09",
    "rating": 5,
    "user_id": 1
  },
  ...
]
```

------------------------------------------------


## List the most rated films

URL: `/api/films/most_rated`

HTTP Method: GET

Description: Retrieve most rated films.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs. In case of success, returns an array of most rated films.

Response Body: 
```json
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "watch_date": "2026-03-09",
    "rating": 5,
    "user_id": 1
  },
  ...
]
```

------------------------------------------------


## List all films seen in the last month

URL: `/api/films/seen_last_month`

HTTP Method: GET

Description: Retrieve all films seen in the last month (current included).

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs. In case of success, returns an array of films seen in the last month.

Response Body: 
```json
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "watch_date": "2026-03-09",
    "rating": 5,
    "user_id": 1
  },
  ...
]
```

## List all the unseen films

URL: `/api/films/unseen`

HTTP Method: GET

Description: Retrieve all unseen films unseen.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs. In case of success, returns an array of unseen films.

Response Body: 
```json
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "watch_date": "2026-03-09",
    "rating": 5,
    "user_id": 1
  },
  ...
]
```

## Get a film by its id

URL: `/api/films/:id`

HTTP Method: GET

Description: Retrieve the film identified by `:id`.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs. In case of success, returns the film with id = `:id`.

Response Body:
```json
{
  "id": 1,
  "title": "Pulp Fiction",
  "favorite": 1,
  "watch_date": "2026-03-09",
  "rating": 5,
  "user_id": 1
}
```

## Create a new film

URL: `/api/films`

HTTP Method: POST

Description: Create a new film.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs or `422 Unprocessable Entity` if `favorite, rating, user_id` are not positive, `rating` out of range. In case of success, returns the inserted film with its id.

Request Body:
```json
{
  "title": "Shrek",
  "favorite": 0,
  "watch_date": "2026-03-09",
  "rating": 3,
  "user_id": 1
}
```


Response Body:

```json
{
  "id": 7,
  "title": "Shrek",
  "favorite": 0,
  "watch_date": "2026-03-09",
  "rating": 3,
  "user_id": 1
}
```




## Update a film given its id

URL: `/api/films/:id`

HTTP Method: PUT

Description: Update an existing film.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs or `422 Unprocessable Entity` if `favorite, rating, user_id` are not positive, `rating` is out of range, if `id` is not set or `404 Not Found` if specified `id` doesn't exist. In case of success, returns the updated film with its new values.

Request Body:
```json
{
  "title": "Shrek",
  "favorite": 0,
  "watch_date": "2026-03-09",
  "rating": 3,
  "user_id": 1
}
```


Response Body:

```json
{
  "id": "13",
  "title": "Shrek 4",
  "favorite": 0,
  "watch_date": "2026-03-09",
  "rating": 1,
  "user_id": 1
}
```


## Update the rating of a film given its id

URL: `/api/films/:id`

HTTP Method: PATCH

Description: Update the rating of an existing film.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs or `422 Unprocessable Entity` if `favorite, rating, user_id` are not positive, `rating` is out of range, if `id` is not set or `404 Not Found` if specified `id` doesn't exist. In case of success, returns the updated film with its new values.

Request Body:
```json
{
  "rating": 3,
}
```


Response Body:
```json
{
  "new_rating": 3
}
```


## Update the favorite value of a film given its id

URL: `/api/films/:id/favorite`

HTTP Method: PATCH

Description: Update the favorite value of an existing film.

Response: `200 OK` (success), 500 `Internal Server Error` if error occurs or `422 Unprocessable Entity` if `rating` is not positive or is out of range, if `id` is not set or `404 Not Found` if specified `id` doesn't exist. In case of success, returns the updated film with its new values.

Request Body:
```json
{
  "favorite": 1,
}
```


Response Body:
```json
{
  "new_favorite_value": 3
}
```




## Delete an existing film given its id

URL: `/api/films/:id`

HTTP Method: DELETE

Description: Delete an existing film.

Response: `204 No Content` (success), 500 `Internal Server Error` or `404 Not Found` if specified `id` doesn't exist.
