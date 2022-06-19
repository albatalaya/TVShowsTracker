# TVShowsTracker
TV Show Tracker API for the Backend project.

## Built with
- Express
- MongoDB

## Getting started
* Clone this repository: `git clone https://github.com/albatalaya/TVShowsTracker.git`
* `cd TVShowsTracker/db`
* `sudo docker-compose up -d`
* `cd ../server`
* `npm install` 
* `npm run dev` 

## API Documentation
### Schemas

Each TV Show has a required name and an array with the ids of all their episodes.
`{
 name: String,
 episodes: [{Schema.Types.ObjectId}]
}`


Each Episode has a required name, season number, episode number, and watched status
`{
 name: String,
 season: Number,
 episode: Number,
 watched: Boolean
}`


### Requests

#### Get All TV Shows
`GET /tvshows`

Responses:
* `200` Success 
* `500 Could not get the TV Shows`

#### Add TV Show
Call:

`POST /tvshows`

Input Example:

`{
	"name": "Little Fires Everywhere"
}`


Responses:
* `200` Success 
* `400 TV Show already exists`
* `500 Could not create the TV Shows`

#### Get TV Show
Call:

`GET /tvshows/:id_show`

Responses:
* `200` Success 
* `404 TV Show does not exist`
* `500 Could not get the TV Shows`


#### Delete TV Show
Call:

`DEL /tvshows/:id_show`

Responses:
* `200` Success 
* `404 TV Show does not exist`
* `500 Could not delete the TV Shows`


#### Get All Episodes of the TV Show
Call:

`GET /tvshows/:id_show/episodes`

  Responses:
* `200` Success 
* `404 TV Show does not exist`
* `500 Could not get the Episodes of this TV Show`


#### Add Episode
Call:

`POST /tvshows/:id_show/episodes`

Input Example:

` {
    "name":"Seventy Cents",
    "season": 1,
    "episode": 3,
	 "watched": false
  }`
  
  Responses:
* `200` Success 
* `404 TV Show does not exist`
* `400 Episode already exists`
* `500 Could not create the Episode`


#### Get Episode
Call:

`GET /tvshows/:id_show/episodes/:id_episode`

Responses:
* `200` Success 
* `404 Episode does not exist`
* `500 Could not get the Episode`


#### Delete Episode
Call:

`DEL /tvshows/:id_show/episodes/:id_episode`

Responses:
* `200` Success 
* `404 TV Show does not exist`
* `404 Episode does not exist`
* `500 Could not delete the Episode`

#### Update Episode Watched Status
Call:

`PUT /tvshows/:id_show/episodes/:id_episode`

Input Example:

 `{
	 "watched": true
  }`
  
  
Responses:
* `200` Success 
* `404 Episode does not exist`
* `500 Could not update the Episode`


Barcelona, 2022
