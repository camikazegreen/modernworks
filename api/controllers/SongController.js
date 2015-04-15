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
   // console.log(req);
   console.log(req.fieldname('title'));
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
			

 				  console.log(err);
 				  Song.create({
					songFd: uploadedFiles[0].fd,
					songMP3url: uploadedFiles[0].extra.Location
			// 		title: tags.title,
			// 		artist: tags.artist,
			// 		album: tags.album,
			// 		year: tags.year
				},function(err,song){
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.write(JSON.stringify({ status: 'OK' }));
					res.end();
					return res;
				// if (err) return res.negotiate(err);
				// return res.redirect('song/songMP3?id=1');
			});

			// .exec(function(err){
			// 	if (err) return res.negotiate(err);
			// 	return res.redirect('song/songMP3'+song.id);
			// });
		});
	},
	response: function(req,res){
		console.log("at least this one is working");
	},
	songMP3: function(req,res){

		req.validate({
			id:'string'
		});
		Song.findOne(req.param('id')).exec(function(err,song){
			console.log('findOne.exec is happening');
			if(err) {
				console.log('error is happening at step1');
				return res.negotiate(err);
			}
			if(!song) {
				console.log('error is happening at step2');
				return res.notFound();
			}

			if(!song.songFd){
				console.log('error is happening at step3');
				return res.notFound();
			}
			if(!song.songMP3url){
				console.log('error is happening at step4');
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

