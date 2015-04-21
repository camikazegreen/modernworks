
/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
* adding some
*/

module.exports = {

  attributes: {
    username:{
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
    passports:{
      collection:'passport',
      via: 'user'
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

>>>>>>> 11ec5d1acf0d88aea3bb96bbfb26fe533221349d
  }
};

module.exports = User;
