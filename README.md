# LIRI - Language Interpretation and Recognition Interface
##### LIRI is a command line `node js` app that takes command line parameters and gives you back data retrieved from different web API's.

## Overview
##### LIRI takes following commands: 
* `concert-this`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says`
###### Result is displayed on the terminal. Result is also logged in `log.txt`

## What each command does:
(1) `concert-this <artist/band name here>`:
This command will search the [_Bands in Town Artist Events_](https://artists.bandsintown.com/support/bandsintown-api) API for the artist/band name and returns the following information about each event to the terminal: Name of the venue,Venue location,Date of the Event.

(2) `spotify-this-song <song name here>`: This command uses [_Spotify API_](https://developer.spotify.com/documentation/web-api/) to fetch details like song artist,preview link of song from Spotify,album name.If no song name is provided, then it defaults to "The Sign" by Ace of Base.

(3) `movie-this <movie name here>`: This command makes use of [_OMDB_](http://www.omdbapi.com/) API to search movie details like release year,country,language,IMDB rating, Rotten Tomatoes rating,movie plot, actors. If no movie name is provided, then it defaults to "Mr. Nobody" movie details.

(4) `do-what-it-says`: LIRI will execute command from random.txt file.Current command in _random.txt_ is `spotify-this-song,"I want it that way"`

## How to execute
---
* Clone this repository.
* On your CLI terminal execute command `npm install` to install the dependancies.
* Set following environmental variables
* APP_ID = _your Bands in town artist event API key_
* SPOTIFY_ID = _your spotify api id_
* SPOTIFY_SECRET = _your spotify api secret key_
