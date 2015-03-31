/**
 * PublisherController
 *
 * @description :: Server-side logic for managing publishers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `PublisherController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },
/**
 * 'PublisherController.new()'
 */
  new: function(req,res){
    res.send(
      '<form action="http://107.170.53.5:1337/publisher/create" enctype="multipart/form-data" method="post">'+
      'name:<input type="text" name="name"><br>'+
      'email:<input type="text" name="email"><br>'+
      'password:<input type="text" name="password"><br>'+
      '<input type="submit" value="submit">'+
      '</form>'
      )
  },

  /**
   * `PublisherController.create()`
   */
  create: function (req, res) {
    var params = req.params.all()
    var name = params.name;
    var PRO = params.PRO;
    var capacity = params.capacity;
    var linkedPublisher = params.linkedPublisher;
    var linkedCapacity = params.linkedCapacity;
    var caeIpi = params.caeIpi;
    var controlled = params.controlled;
    Publisher.create({name:name,PRO:PRO,capacity:capacity,linkedPublisher:linkedPublisher,linkedCapacity:linkedCapacity,caeIpi:caeIpi,controlled:controlled}, function(err, publisher){
      if (err){
        res.send(err);
      }
      else{
        return res.send(publisher.id);
      }
    });
  },


  /**
   * `PublisherController.show()`
   */
  show: function (req, res) {
    var id = req.param('id');
    Publisher.findById(id, function(err, publisher){
      if (err){
        res.send(err);
      }
      else{
        res.send(publisher);
      }
    });
  },



  /**
   * `PublisherController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `PublisherController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};




