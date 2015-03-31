/**
* Composer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	user:{
  		model: 'user'
  	},
  	capacity:{
  		model: 'capacity'
  	},
  	publisher:{
  		model: 'publisher'
  	},
  	caeIpi:{
  		type: 'string'
  	},
  	controlled:{
  		type: 'boolean'
  	},
  	PRO:{
  		model: 'PRO'
  	}

  }
};

