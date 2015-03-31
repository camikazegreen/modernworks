/**
 * DepositDetailController
 *
 * @description :: Server-side logic for managing depositdetails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `DepositDetailController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },
/**
 * 'DepositDetailController.new()'
 */
  new: function(req,res){
    res.send(
      '<form action="http://107.170.53.5:1337/depositDetail/create" enctype="multipart/form-data" method="post">'+
      'name:<input type="text" name="name"><br>'+
      'email:<input type="text" name="email"><br>'+
      'password:<input type="text" name="password"><br>'+
      '<input type="submit" value="submit">'+
      '</form>'
      )
  },

  /**
   * `DepositDetailController.create()`
   */
  create: function (req, res) {
    var params = req.params.all()
    var name = params.name;
    var account = params.account;
    var routing = params.routing;
    var bankName = params.bankName;
    var checking = params.checking;
    var attachment = params.attachment;
    var user = params.user;
    DepositDetail.create({name:name,account:account,routing:routing,bankName:bankName,checking:checking,attachment:attachment,user:user}, function(err, depositDetail){
      if (err){
        res.send(err);
      }
      else{
        return res.send(depositDetail.id);
      }
    });
  },


  /**
   * `DepositDetailController.show()`
   */
  show: function (req, res) {
    var id = req.param('id');
    DepositDetail.findById(id, function(err, depositDetail){
      if (err){
        res.send(err);
      }
      else{
        res.send(depositDetail);
      }
    });
  },



  /**
   * `DepositDetailController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `DepositDetailController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};




