/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `UserController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },
/**
 * 'UserController.new()'
 */
  new: function(req,res){
    res.send(
      '<form action="http://107.170.53.5:1337/user/create" enctype="multipart/form-data" method="post">'+
      'name:<input type="text" name="name"><br>'+
      'email:<input type="text" name="email"><br>'+
      'password:<input type="text" name="password"><br>'+
      '<input type="submit" value="submit">'+
      '</form>'
      )
  },

  /**
   * `UserController.create()`
   */
  create: function (req, res) {
    var params = req.params.all();
    var name = params.name;
    var email = params.email;
    var pass = params.password;
    User.create({name:name,email:email,password:pass}, function(err, user){
      if (err){
        res.send(err);
      }
      else{
        return res.redirect('user/show/'+user.id);
      }
    });
  },


  /**
   * `UserController.show()`
   */
  show: function (req, res) {
    var id = req.param('id');
    User.findById(id, function(err, user){
      if (err){
        res.send(err);
      }
      else{
        res.send(user);
      }
    });
  },



  /**
   * `UserController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `UserController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};
