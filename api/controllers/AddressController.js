/**
 * AddressController
 *
 * @description :: Server-side logic for managing Addresss
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `AddressController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },
/**
 * 'AddressController.new()'
 */
  new: function(req,res){
    res.send(
      '<form action="http://107.170.53.5:1337/address/create" enctype="multipart/form-data" method="post">'+
      'name:<input type="text" name="name"><br>'+
      'email:<input type="text" name="email"><br>'+
      'password:<input type="text" name="password"><br>'+
      '<input type="submit" value="submit">'+
      '</form>'
      )
  },

  /**
   * `AddressController.create()`
   */
  create: function (req, res) {
    var params = req.params.all()
    var info1 = params.info1;
    var info2 = params.info2;
    var city = params.city;
    var state = params.state;
    var zip = params.zip;
    Address.create({name:name,email:email,password:pass}, function(err, address){
      if (err){
        res.send(err);
      }
      else{
        return res.send(address.id);
      }
    });
  },


  /**
   * `AddressController.show()`
   */
  show: function (req, res) {
    var id = req.param('id');
    Address.findById(id, function(err, address){
      if (err){
        res.send(err);
      }
      else{
        res.send(address);
      }
    });
  },



  /**
   * `AddressController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `AddressController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};
