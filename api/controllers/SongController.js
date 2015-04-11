/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var apikeys= require('./apikeys.js');
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
   // console.log(apikeys.s3keys);
		req.file('songMP3').upload({
			adapter: require('skipper-s3'),
			key: apikeys.s3keys[0].key,
			secret: apikeys.s3keys[0].secret,
			bucket: 'mw-songs',
			region: 'Oregon'
		},function whenDone(err,uploadedFiles){
			if (err){
				return res.negotiate(err);
			}
			if(uploadedFiles.length===0){
				return res.badRequest('No file was uploaded');
			}

            console.log(uploadedFiles);
//			var id3 = require('id3js');
//
//			id3({ file: uploadedFiles[0].extra.Location, type: id3.OPEN_LOCAL }, function(err, tags) {
//  				  // tags now contains your ID3 tags
//  				  console.log(err);
 				  Song.create({
					songFd: uploadedFiles[0].fd,
					songMP3url: uploadedFiles[0].extra.Location
					// title: tags.title,
					// artist: tags.artist,
					// album: tags.album,
					// year: tags.year
				},function(err,song){
				if (err) return res.negotiate(err);
				return res.redirect('song/songMP3?id=1');
			})
//			});

			// .exec(function(err){
			// 	if (err) return res.negotiate(err);
				// return res.redirect('song/songMP3'+song.id);
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
			var SkipperS3 = require('skipper-s3');
			var fileAdapter = SkipperS3({
				key: apikeys.s3keys[0].key,
				secret: apikeys.s3keys[0].secret,
				bucket: 'mw-songs',
				region: 'Oregon'
			});
			
			fileAdapter.read(song.songMP3url)
			// fileAdapter.read(song.songMP3url)
			.on('error',function(err){
				console.log('the error is in the on function');
				return res.serverError(err);
			})
			.pipe(res);
		});
	}
};

