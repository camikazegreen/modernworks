/**
 * CapacityController
 *
 * @description :: Server-side logic for managing capacities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `CapacityController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },
/**
 * 'CapacityController.new()'
 */
  new: function(req,res){
    res.send(
      '<form action="http://107.170.53.5:1337/capacity/create" enctype="multipart/form-data" method="post">'+
      'name:<input type="text" name="name"><br>'+
      'email:<input type="text" name="email"><br>'+
      'password:<input type="text" name="password"><br>'+
      '<input type="submit" value="submit">'+
      '</form>'
      )
  },

  /**
   * `CapacityController.create()`
   */
  create: function (req, res) {
    var params = req.params.all()
    var name = params.name;
    Capacity.create({name:name}, function(err, capacity){
      if (err){
        res.send(err);
      }
      else{
        return res.send(capacity.id);
      }
    });
  },


  /**
   * `CapacityController.show()`
   */
  show: function (req, res) {
    var id = req.param('id');
    Capacity.findById(id, function(err, capacity){
      if (err){
        res.send(err);
      }
      else{
        res.send(capacity);
      }
    });
  },



  /**
   * `CapacityController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `CapacityController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};


