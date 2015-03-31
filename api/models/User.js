/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{
      type:'string',
      unique: true
    },
    email:{
      type:'email',
      unique:true
    },
    password:{
      type:'string'
    },
    phone:{
      type: 'string'
    },
    address:{
      model: 'address'
    },
    digital:{
      type: 'boolean'
    },
    deposit:{
      type: 'boolean'
    },
    depositDetail:{
      model: 'depositDetail'
    },
    checkDetail:{
      model: 'checkDetail'
    },
    company:{
      model: 'company'
    },
    publisher:{
      model:'publisher'
    },
    isComposer:{
      type: 'boolean'
    },
    composer:{
      model: 'composer'
    },
    accountManager:{
      model: 'user'
    },
    isAccountManager:{
      type: 'boolean'
    },
    accountsManaged:{
      collection:'user',
      via:'accountManager'
    },
    startDate:{
      type:'date'
    },
    expiryDate:{
      type:'date'
    },
    finder:{
      model:'user'
    },
    finderClients:{
      collection:'user',
      via:'finder'
    },
    cc:{
      model:'user'
    },
    ccFor:{
      collection:'user',
      via:'cc'
    }

  }
};

