/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	* 'SongController.index()'
	*/
	index: function (req, res){
		return res.json({
			todo: 'index() is not implemented yet'
		});
	},
	/**
	* 'SongController.create()'
	*/
	create: function (req, res){
		var params = req.params.all();

	},
	upload: function (req,res){
		req.file('songMP3').upload({
			maxBytes:10000000000
		},function whenDone(err,uploadedFiles){
			if (err){
				return res.negotiate(err);
			}
			if(uploadedFiles.length===0){
				return res.badRequest('No file was uploaded');
			}
			Song.update(req,{
			songFd: uploadedFiles[0].fd,
			songMP3url: require('util').format('%s/song/mp3/%s', sails.getBaseUrl(),uploadedFiles[0].fd)
		})
			.exec(function(err){
				if (err) return res.negotiate(err);
				return res.ok();
			});
		});
	},
	songMP3: function(req,res){

		req.validate({
			id:'string'
		});
		Song.findOne(req.param('id')).exec(function(err,song){
			if(err) return res.negotiate(err);
			if(!song) return res.notFound();

			if(!song.songFd){
				return res.notFound();
			}
			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk();

			fileAdapter.read(song.avatarFd)
			.on('error',function(err){
				return res.serverError(err);
			})
			.pipe(res);
		});
	}
};

