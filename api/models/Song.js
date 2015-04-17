/**
* Song.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	title:{
  		type:'string'
  	},
  	artist:{
  		type:'string'
  	},
  	artistID:{
  		model:'user'
  	},
  	album:{
  		type:'string'
  	},
  	year:{
  		type:'integer'
  	},
  	songMP3url:{
  		type:'string'
  	},
  	songFd:{
  		type:'string'
  	},
    mbid:{
      type:'string'
    }

  }
};

