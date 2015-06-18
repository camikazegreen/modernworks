     
-/**    +module.exports = {
-* User.js    +    attributes: {
-*    +        email: {
-* @description :: TODO: You might write a short summary of how this model works and what it represents here.   +            type: 'email',
-* @docs        :: http://sailsjs.org/#!documentation/models    +            required: true,
-* adding some    +            unique: true
-*/   +        },
-   +        password: {
-var User  = {    +            type: 'string',
-  schema: true,    +            minLength: 6,
-   +            required: true
-  attributes: {    +        },
-    username:{   +        toJSON: function() {
-      type:'string',   +            var obj = this.toObject();
-      unique: true   +            delete obj.password;
-    },   +            return obj;
-    email:{    +        }
-      type:'email',    +    },
-      unique:true    +    beforeCreate: function(user, cb) {
-    },   +        bcrypt.genSalt(10, function(err, salt) {
-    password:{   +            bcrypt.hash(user.password, salt, function(err, hash) {
-      type:'string'    +                if (err) {
-    },   +                    console.log(err);
-    passports:{    +                    cb(err);
-      collection:'passport',   +                } else {
-      via: 'user'    +                    user.password = hash;
-    },   +                    cb();
-    phone:{    +                }
-      type: 'string'   +            });
-    },   +        });
-    address:{    
-      model: 'address'   
-    },   
-    digital:{    
-      type: 'boolean'    
-    },   
-    deposit:{    
-      type: 'boolean'    
-    },   
-    depositDetail:{    
-      model: 'depositDetail'   
-    },   
-    checkDetail:{    
-      model: 'checkDetail'   
-    },   
-    company:{    
-      model: 'company'   
-    },   
-    publisher:{    
-      model:'publisher'    
-    },   
-    isComposer:{   
-      type: 'boolean'    
-    },   
-    composer:{   
-      model: 'composer'    
-    },   
-    accountManager:{   
-      model: 'user'    
-    },   
-    isAccountManager:{   
-      type: 'boolean'    
-    },   
-    accountsManaged:{    
-      collection:'user',   
-      via:'accountManager'   
-    },   
-    startDate:{    
-      type:'date'    
-    },   
-    expiryDate:{   
-      type:'date'    
-    },   
-    finder:{   
-      model:'user'   
-    },   
-    finderClients:{    
-      collection:'user',   
-      via:'finder'   
-    },   
-    cc:{   
-      model:'user'   
-    },   
-    ccFor:{    
-      collection:'user',   
-      via:'cc'   
     }         }
-   +}; 
-  }    
-};   
-   
-module.exports = User;