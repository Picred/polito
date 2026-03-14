# API Documentation

## List all films

URL: `/api/films`

HTTP Method: GET

Description: Retrieve all films.

Response: `200 OK` (success), 500 `Internal Server Error` if erorr occurs.

Response Body: 
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 0,
    "watch_date": "2026-03-09T23:00:00.000Z",
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

Response: `200 OK` (success), 500 `Internal Server Error` if erorr occurs.

Response Body: 
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "watch_date": "2026-03-09T23:00:00.000Z",
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

Response: `200 OK` (success), 500 `Internal Server Error` if erorr occurs.

Response Body: 
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "watch_date": "2026-03-09T23:00:00.000Z",
    "rating": 5,
    "user_id": 1
  },
  ...
]
```

------------------------------------------------


## List 

URL: `/api/films/favorite`

HTTP Method: GET

Description: Retrieve most rated films.

Response: `200 OK` (success), 500 `Internal Server Error` if erorr occurs.

Response Body: 
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "watch_date": "2026-03-09T23:00:00.000Z",
    "rating": 5,
    "user_id": 1
  },
  ...
]
```