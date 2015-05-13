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

		Concerts.find({id:1}).then(function(err, rows) {
  console.log('new york has these events: '+rows);
})


		return res.view('concerts',{
			artists: artists,
			concerts: concerts
		});
	}

};

