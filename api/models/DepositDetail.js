/**
* DepositDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:{
  		type: 'string'
  	},
  	account:{
  		type: 'string'
  	},
  	routing:{
  		type: 'string'
  	},
  	bankName:{
  		type: 'string'
  	},
  	checking:{
  		type: 'boolean'
  	},
  	attachment:{
  		type: 'boolean'
  	},
  	user:{
  		model: 'user'
  	}

  }
};

