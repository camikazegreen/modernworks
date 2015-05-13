/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var apikeys = require('../api/controllers/apikeys.js');
var artists = require('../assets/roster.js');
var http = require('http');

module.exports.bootstrap = function(cb) {

//This loads in all of our authentication strategies.

sails.services.passport.loadStrategies();

function loadEvents(){
	console.log("loading events...")

		// console.log(artists);
		var concerts = {};
		concerts.newYork = [];
		concerts.losAngeles = [];
		concerts.nashville = [];
		concerts.tucson = [];
		concerts.phoenix = [];
		var apikey = apikeys.songkickkeys[0].apikey;
		var newYork = "sk:7644";
		var losAngeles = "sk:17835"; 
		var nashville = "sk:11104";
		var tucson = "sk:10046";
		var phoenix = "sk:23068";
		// http://api.songkick.com/api/3.0/events.xml?apikey=KEY&location=sk:2846&artist_name=fleet+foxes
		// console.log(artists);
function getConcerts(city,artist){
	var options = {
		host: 'api.songkick.com',
		path: '/api/3.0/events.json?apikey='+apikey+'&location='+city+'&artist_name='+artist
	};
	console.log('getting concerts for '+path)

	var callback = function(response){
		var str = '';

		response.on('data',function(chunk){
			str += chunk;
		});

		response.on('end', function(){
			var json = JSON.parse(str);
			if(json.resultsPage.totalEntries>0){
				var conString = JSON.stringify(json.resultsPage.results.event);
			if(city==phoenix){
			// concerts.phoenix.push(details);
			Concerts.create({location:'phoenix'},{string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==newYork){
			// concerts.newYork.push(details);
			Concerts.create({location:'newYork'},{string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==losAngeles){
			// concerts.losAngeles.push(details);
			Concerts.create({location:'losAngeles'},{string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==nashville){
			// concerts.nashville.push(details);
			Concerts.create({location:'nashville'},{string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==tucson){
			// concerts.tucson.push(details);
			Concerts.create({location:'tucson'},{string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }// else
    });//Concerts.create
		}// if tucson
			}//if totalEntries > 0

		});
	}
	http.request(options, callback).end();
}
var a = 0;
while(a<=artists.artists.length){

	getConcerts(newYork,artists.artists[a]);
	getConcerts(phoenix,artists.artists[a]);
	getConcerts(losAngeles,artists.artists[a]);
	getConcerts(nashville,artists.artists[a]);
	getConcerts(tucson,artists.artists[a]);
	// console.log(concerts);

	a++;
}


	}
sails.on('lifted',function(){
	loadEvents()
});

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
