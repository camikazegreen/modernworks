/**
 * ConcertsController
 *
 * @description :: Server-side logic for managing concerts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var apikeys = require('./apikeys.js');
var artists = require('../../assets/roster.js');
var http = require('http');

module.exports = {
	
	index: function (req, res){
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

	var callback = function(response){
		var str = '';

		response.on('data',function(chunk){
			str += chunk;
		});

		response.on('end', function(){
			var json = JSON.parse(str);
			if(json.resultsPage.totalEntries>0){
				var details = json.resultsPage.results.event;
			if(city==phoenix){
			concerts.phoenix.push(details)
		}else if(city==newYork){
			concerts.newYork.push(details)
		}else if(city==losAngeles){
			concerts.losAngeles.push(details)
		}else if(city==nashville){
			concerts.nashville.push(details)
		}else if(city==tucson){
			concerts.tucson.push(details)
		}
			console.log(concerts);
			}
		});
	}
	http.request(options, callback).end();
}
var a = 0;
while(a<artists.artists.length){
	getConcerts(newYork,artists.artists[a]);
	getConcerts(phoenix,artists.artists[a]);
	getConcerts(losAngeles,artists.artists[a]);
	getConcerts(nashville,artists.artists[a]);
	getConcerts(tucson,artists.artists[a]);

	a++;
}

		return res.view('concerts',{
			artists: artists,
			concerts: concerts
		});
	}

};

