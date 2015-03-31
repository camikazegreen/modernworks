/**
* Publisher.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:{
  		type: 'string'
  	},
  	PRO:{
  		model: 'PRO'
  	},
  	capacity:{
  		model: 'capacity'
  	},
  	linkedPublisher:{
  		model: 'publisher'
  	},
  	publishersLinked{
  		collection: 'publisher',
  		via: 'linkedPublisher'
  	},
  	linkedCapacity:{
  		model: 'capacity'
  	},
  	caeIpi:{
  		type: 'string'
  	},
  	controlled:{
  		type: 'boolean'
  	}

  }
};

