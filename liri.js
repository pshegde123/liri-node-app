require("dotenv").config();
var request = require('request');
var moment = require('moment');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var userInput = "";
var nextUserInput = "";
var nodeArgs = process.argv;
var command = process.argv[2];


//Grab user input for songs, artists and movie names
for (var i = 3; i < nodeArgs.length; i++) {

    //If userInput is more than 1 word
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "%20" + nodeArgs[i];
    }
    //If userInput is only 1 word
    else {
        userInput += nodeArgs[i];
    }
    console.log(userInput);
}

//Remove %20 when pushing to log.txt
for (var i = 3; i < nodeArgs.length; i++) {
    nextUserInput = userInput.replace(/%20/g, " ");
}

//For liri-bot command "concert-this 'artist-name'",
//this function uses Bands in Town API to search the artist's event details.
//Details are displayed on the terminal and also appended to log file 'log.txt'
//If artist name is not provided, function displays error message "Missing artist name". 
function concertThis() {
    var artist = userInput;
    if(artist==""){
        console.log("Missing artist name.");
        return;
    }
    var bands_url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + process.env.APP_ID;

    //Append userInput to log.txt
    fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
        if (error) {
            console.log(error);
        };
    });

    request(bands_url, function (error, response, body) {
        //If no error and response is a success
        if (!error && response.statusCode === 200) {
            //Parse the json response
            var data = JSON.parse(body);
            //Loop through array
            for (var i = 0; i < data.length; i++) {
                //Get venue name
                console.log("Venue: " + data[i].venue.name);
                //Append data to log.txt
                fs.appendFileSync("log.txt", "Venue: " + data[i].venue.name + "\n", function (error) {
                    if (error) {
                        console.log(error);
                    };
                });
                //Get venue location
                //If statement for concerts without a region
                if (data[i].venue.region == "") {
                    console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                    //Append data to log.txt
                    fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.country + "\n", function (error) {
                        if (error) {
                            console.log(error);
                        };
                    });

                } else {
                    console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                    //Append data to log.txt
                    fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country + "\n", function (error) {
                        if (error) {
                            console.log(error);
                        };
                    });
                }
                //Get date of show
                var date = data[i].datetime;
                date = moment(date).format("MM/DD/YYYY");
                console.log("Date: " + date)
                //Append data to log.txt
                fs.appendFileSync("log.txt", "Date: " + date + "\n----------------\n", function (error) {
                    if (error) {
                        console.log(error);
                    };
                });
            }
            console.log("----------------")
        }
    });
}

//For liri-bot command "spotify-this-song 'song-title'",
//this function uses Spotify API to search the song details.
//Details are displayed on the terminal and also appended to log file 'log.txt'
//If no song title is provided, defaults to "The Sign" track by Ace of Base. 
function spotifyThisSong() {
    var search_type = "track";
    var search_query = "";
    var result = "";
    if (!userInput) {
        userInput = "The+Sign";
        nextUserInput = userInput.replace(/%20/g, " ");
        var artist = "Ace+of+Base";
        var query = "https://api.spotify.com/v1/search?q=track:" + userInput + "%20artist:" + artist + "&type=track&limit=1";
        spotify
            .request(query)
            .then(function (data) {
                //Assign data being used to a variable
                var info = data.tracks.items

                //Loop through all the "items" array
                for (var i = 0; i < info.length; i++) {
                    //Store "album" object to variable
                    var albumObject = info[i].album;
                    var trackName = info[i].name
                    var preview = info[i].preview_url
                    //Store "artists" array to variable
                    var artistsInfo = albumObject.artists
                    //Loop through "artists" array
                    for (var j = 0; j < artistsInfo.length; j++) {
                        console.log("Artist: " + artistsInfo[j].name)
                        console.log("Song Name: " + trackName)
                        console.log("Preview of Song: " + preview)
                        console.log("Album Name: " + albumObject.name)
                        console.log("----------------")
                        //Append data to log.txt
                        fs.appendFileSync("log.txt", "Artist: " + artistsInfo[j].name + "\nSong Name: " + trackName + "\nPreview of Song: " + preview + "\nAlbum Name: " + albumObject.name + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                    }
                }
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    }
    else {
        spotify.search({

            type: "track",
            query: userInput
        }, function (err, data) {
            //Assign data being used to a variable
            var info = data.tracks.items

            //Loop through all the "items" array
            for (var i = 0; i < info.length; i++) {
                //Store "album" object to variable
                var albumObject = info[i].album;
                var trackName = info[i].name
                var preview = info[i].preview_url
                //Store "artists" array to variable
                var artistsInfo = albumObject.artists
                //Loop through "artists" array
                for (var j = 0; j < artistsInfo.length; j++) {
                    console.log("Artist: " + artistsInfo[j].name)
                    console.log("Song Name: " + trackName)
                    console.log("Preview of Song: " + preview)
                    console.log("Album Name: " + albumObject.name)
                    console.log("----------------")
                    //Append data to log.txt
                    fs.appendFileSync("log.txt", "Artist: " + artistsInfo[j].name + "\nSong Name: " + trackName + "\nPreview of Song: " + preview + "\nAlbum Name: " + albumObject.name + "\n----------------\n", function (error) {
                        if (error) {
                            console.log(error);
                        };
                    });
                }
            }
        });
    }

}

//This function executes liri-bot command mentioned in the random.txt file
function doWhatItSays() {
    var fs = require("fs");

    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }

        //Split data into array
        var textArr = data.split(",");
        command = textArr[0];
        userInput = textArr[1];
        nextUserInput = userInput.replace(/%20/g, " ");
        runBot();
    });
}

//For liri-bot command "movie-this 'movie-name'",
//this function uses OMDB API to search the movie details.
//Details are displayed on the terminal and also appended to the log file 'log.txt'
//If movie-name is not provided, function displays details of movie "Mr. Nobody". 
function showMovieDetails() {
    //If statement for no movie provided
    if (!userInput) {
        userInput = "Mr%20Nobody";
        nextUserInput = userInput.replace(/%20/g, " ");
    }

    //Append userInput to log.txt
    fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
        if (error) {
            console.log(error);
        };
    });

    //Run request to OMDB
    var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            console.log("Title: " + info.Title)
            console.log("Release Year: " + info.Year)
            console.log("OMDB Rating: " + info.Ratings[0].Value)
            console.log("Rating: " + info.Ratings[1].Value)
            console.log("Country: " + info.Country)
            console.log("Language: " + info.Language)
            console.log("Plot: " + info.Plot)
            console.log("Actors: " + info.Actors)

            //Append data to log.txt
            fs.appendFileSync("log.txt", "Title: " + info.Title + "\nRelease Year: " + info.Year + "\nIMDB Rating: " + info.Ratings[0].Value + "\nRating: " +
                info.Ratings[1].Value + "\nCountry: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: " + info.Actors + "\n----------------\n",
                function (error) {
                    if (error) {
                        console.log(error);
                    };
                });
        }
    });
}

function runBot() {
    switch (command) {
        case 'concert-this':
            concertThis();
            break;
        case 'spotify-this-song':
            spotifyThisSong();
            break;
        case 'movie-this':
            showMovieDetails();
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Unknown command:', command);
            fs.appendFileSync('log.txt', "Unknown command:" + command);
            break;
    }
}

//Run the liri bot
runBot();