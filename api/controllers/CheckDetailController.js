/**
 * CheckDetailController
 *
 * @description :: Server-side logic for managing checkdetails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `CheckDetailController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },
/**
 * 'CheckDetailController.new()'
 */
  new: function(req,res){
    res.send(
      '<form action="http://107.170.53.5:1337/checkDetail/create" enctype="multipart/form-data" method="post">'+
      'name:<input type="text" name="name"><br>'+
      'email:<input type="text" name="email"><br>'+
      'password:<input type="text" name="password"><br>'+
      '<input type="submit" value="submit">'+
      '</form>'
      )
  },

  /**
   * `CheckDetailController.create()`
   */
  create: function (req, res) {
    var params = req.params.all()
    var payee = params.payee;
    var address = params.address;
    var user = params.user;
    CheckDetail.create({payee:payee,address:address,user:user}, function(err, address){
      if (err){
        res.send(err);
      }
      else{
        return res.send(checkdetail.id);
      }
    });
  },


  /**
   * `CheckDetailController.show()`
   */
  show: function (req, res) {
    var id = req.param('id');
    CheckDetail.findById(id, function(err, checkDetail){
      if (err){
        res.send(err);
      }
      else{
        res.send(checkDetail);
      }
    });
  },



  /**
   * `CheckDetailController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `CheckDetailController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};


