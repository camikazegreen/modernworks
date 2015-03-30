/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `ClientController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },
/**
 * 'ClientController.new()'
 */
  new: function(req,res){
    res.send(
      '<form action="http://107.170.53.5:1337/client/create" enctype="multipart/form-data" method="post">'+
      'name:<input type="text" name="name"><br>'+
      'email:<input type="text" name="email"><br>'+
      'password:<input type="text" name="password"><br>'+
      '<input type="submit" value="submit">'+
      '</form>'
      )
  },

  /**
   * `ClientController.create()`
   */
  create: function (req, res) {
    var params = req.params.all()
    var name = params.name;
    var email = params.email;
    var pass = params.password;
    Client.create({name:name,email:email,password:pass}, function(err, client){
      if (err){
        res.send(err);
      }
      else{
        return res.redirect('client/show/'+client.id);
      }
    });
  },


  /**
   * `ClientController.show()`
   */
  show: function (req, res) {
    var id = req.param('id');
    Client.findById(id, function(err, client){
      if (err){
        res.send(err);
      }
      else{
        res.send(client);
      }
    });
  },



  /**
   * `ClientController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `ClientController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

