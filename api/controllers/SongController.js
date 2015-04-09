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
			adapter: require('skipper-s3'),
			key: 'AKIAJ37U65YDQAQ7FRTA',
			secret: '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',
			bucket: 'mw-songs'
		},function whenDone(err,uploadedFiles){
			if (err){
				return res.negotiate(err);
			}
			if(uploadedFiles.length===0){
				return res.badRequest('No file was uploaded');
			}
			var id3 = require('id3js');
 
			id3({ file: uploadedFiles[0].fd, type: id3.OPEN_LOCAL }, function(err, tags) {
  				  // tags now contains your ID3 tags 
  				  console.log(tags);
  				  Song.create({
					songFd: uploadedFiles[0].fd,
					songMP3url: require('util').format('%s/%s', sails.getBaseUrl(),uploadedFiles[0].fd),
					title: tags.title,
					artist: tags.artist,
					album: tags.album,
					year: tags.year
				},function(err,song){
				if (err) return res.negotiate(err);
				return res.redirect('song/songMP3?id=1');
			})
			});
			
			// .exec(function(err){
			// 	if (err) return res.negotiate(err);
			// 	return res.redirect('song/songMP3'+song.id);
			// });
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

			fileAdapter.read(song.songFd)
			.on('error',function(err){
				return res.serverError(err);
			})
			.pipe(res);
		});
	}
};

