/**
 * AddressController
 *
 * @description :: Server-side logic for managing Addresses
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
    console.log(Address.find({id:{'>':0}}));
    return res.view('address',{
      addresses:'somewhere')
    })
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
    console.log(params);
    Address.create({info1:info1,info2:info2,city:city,state:state,zip:zip}, function(err, address){
      if (err){
        res.send(err);
      }
      else{
        return res.view('address');
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
