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

		Concerts.find({location:'newYork'}).exec(function(err, events) {
  			concerts.newYork.push(events);
		}).find({location:'losAngeles'}).exec(function(err, events) {
  			concerts.losAngeles.push(events);
		}).find({location:'nashville'}).exec(function(err, events) {
  			concerts.nashville.push(events);
		}).find({location:'tucson'}).exec(function(err, events) {
  			concerts.tucson.push(events);
		}).find({location:'phoenix'}).exec(function(err, events) {
  			concerts.phoenix.push(events);
  			return res.view('concerts',{
			artists: artists,
			concerts: concerts
		});
		});
		// Concerts.find({location:'losAngeles'}).exec(function(err, events) {
  // 			concerts.losAngeles.push(events);
		// });
		// Concerts.find({location:'nashville'}).exec(function(err, events) {
  // 			concerts.nashville.push(events);
		// });
		// Concerts.find({location:'tucson'}).exec(function(err, events) {
  // 			concerts.tucson.push(events);
		// });
		// Concerts.find({location:'tucson'}).exec(function(err, events) {
  // 			concerts.tucson.push(events);
		// });
		// console.log(concerts)


		// return res.view('concerts',{
		// 	artists: artists,
		// 	concerts: concerts
		// });
	}

};

