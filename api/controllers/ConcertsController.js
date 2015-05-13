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
function getConcerts(city,artist,end){
}

console.log(concerts);
		return res.view('concerts',{
			artists: artists,
			concerts: concerts
		});
	}

};

