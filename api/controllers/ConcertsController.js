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
		var concerts = {'locations':["sk:7644","sk:17835","sk:11104","sk:10046","sk:23068"],'events':{'newyork':[],'losangeles':[],'nashville':[],'tucson':[],'phoenix':[]}};
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

function getConcerts(city,artist){
	console.log(concerts.locations[city]);
	var options = {
		host: 'api.songkick.com',
		path: '/api/3.0/events.json?apikey='+apikey+'&location='+concerts.locations[city]+'&artist_name='+artist
	};

	var callback = function(response){
		var str = '';

		response.on('data',function(chunk){
			str += chunk;
		});

		response.on('end', function(){
			var json = JSON.parse(str);
			console.log(json);
			concerts.events[city].push(json.resultsPage.results.event[0].displayName)
			console.log(concerts);
		});
	}
	http.request(options, callback).end();
}
getConcerts(5,"jakubi");

		return res.view('concerts',{
			artists: artists,
			concerts: concerts
		});
	}

};

