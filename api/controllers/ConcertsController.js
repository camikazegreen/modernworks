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
  			concerts.newYork.push(JSON.stringify(events));
		Concerts.find({location:'losAngeles'}).exec(function(err, events) {
  			concerts.losAngeles.push(events);
		Concerts.find({location:'nashville'}).exec(function(err, events) {
  			concerts.nashville.push(events);
		Concerts.find({location:'tucson'}).exec(function(err, events) {
  			concerts.tucson.push(events);
		Concerts.find({location:'phoenix'}).exec(function(err, events) {
  			concerts.phoenix.push(events);
  			console.log(concerts);
			return res.view('concerts',{
			artists: artists,
			concerts: concerts
		});//return
		});//find phoenix
		});//find tucson
		});//find nashville
		});//find losAngeles
		})//find newYork

		


		
	}

};

