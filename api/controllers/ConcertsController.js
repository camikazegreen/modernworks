/**
 * ConcertsController
 *
 * @description :: Server-side logic for managing concerts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var apikeys = require('./apikeys.js');
var artists = require('roster.json');

module.exports = {
	
	index: function (req, res){
		return res.view({
			concerts: {"only one show","a second show"}
		});
	}

};

