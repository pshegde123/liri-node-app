require("dotenv").config();
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var myArgs = process.argv.slice(2);
var args = myArgs.toString().split(",");

switch (args[0]) {
    case 'concert-this':
        var artist = args[1];
        var bands_url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + process.env.APP_ID;

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
        break;
    case 'spotify-this-song':
        console.log('spotify-this-song');
        break;
    case 'movie-this':
        console.log('movie-this');
        break;
    case 'do-what-it-says':
        console.log('do-what-it-says');
        break;
    default:
        console.log('default');
        break;
}

//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);