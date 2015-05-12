/**
 * ConcertsController
 *
 * @description :: Server-side logic for managing concerts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var apikeys = require('./apikeys.js');
var artists = require('../../assets/roster.js');

module.exports = {
	
	index: function (req, res){
		console.log(artists);
		return res.view('concerts',{
			artists: artists
		});
	}

};

