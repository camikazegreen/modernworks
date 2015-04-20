/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var apikeys= require('./apikeys.js');
var AWS = require('aws-sdk');
var NB = require('nodebrainz');
var echonest = require('echonest');

// Initialize NodeBrainz
var nb = new NB({userAgent:'my-awesome-app/0.0.1 ( http://my-awesome-app.com )'});
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
// Initialize NodeBrainz
	var nb = new NB({userAgent:'Modern Works Music Publishing ( http://modernworksmusicpublishing.com )'});
    var tags = req.params.all();
    var mbid = {'id':'no song found','writers':[]}; //empty array for MusicBrainz ID
    var echodeets = '';
    nb.search('work',{artist:encodeURIComponent(tags.artist),work:encodeURIComponent(tags.title)}, function(err, response){
    	if(response.works[0]){
    		console.log(response.works);
    		mbid.id=response.works[0].id;
    		i=0;
    		var relations = response.works[0].relations
    		if(relations[0]){
    			console.log('there are relations, and they are:'+response.works[0].relations.length);
    			while(i<relations.length){
    				if(relations[i].type=='writer'){
    					mbid.writers.push(relations[i].artist.name)
    				}
    				console.log(response.works[0].relations[i]);
    				i++;
    			}
    		}
    		
    	}
    });
    //initialize echonest
   var myNest = new echonest.Echonest({
   	api_key: apikeys.echonestkeys[0].apikey
   });
   myNest.song.search({
   	artist:tags.artist,
   	title:tags.title
   }, function (error,response){
   	console.log('searching echonest...')
   	if (error) {
   		console.log(error);
   	// } else if(typeof response.songs[0] === 'undefined'){
   	// 	console.log('no song returned for artist '+tags.artist+' and song '+tags.title);
   	} else if(response.songs[0]){
   		console.log('response:', response);
   		myNest.song.profile({
   			id: response.songs[0].id,
   			bucket: 'audio_summary'
   		}, function(error,response){
   			if(error){
   				console.log('error in searching for profile');
   			} else {
   				console.log('song profile: ', response);
   				console.log('audio summary: ', response.songs[0].audio_summary);
   				echodeets = response.songs[0].audio_summary;
   			}
   		});
   	} else {
   		console.log('no songs found in echonest')
   	}
   });
   // console.log(tags);
		
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
			if (uploadedFiles.length===0){
				return res.badRequest('No file was uploaded');
			}
 			Song.create({
				songFd: uploadedFiles[0].fd,
				songMP3url: uploadedFiles[0].extra.Location,
				title: tags.title,
				artist: tags.artist,
				album: tags.album,
				mbid: JSON.stringify(mbid),
				echonest: JSON.stringify(echodeets)
			},function(err,song){
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ status: song }));
				res.end();
				return res;
			});
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
				// return res.negotiate(err);
			}
			if(!song) {
				console.log('error is happening at step2');
				// return res.notFound();
			}

			if(!song.songFd){
				console.log('error is happening at step3');
				// return res.notFound();
			}
			if(!song.songMP3url){
				console.log('error is happening at step4');
				// return res.notFound();
			}
			AWS.config.update({region:'us-west-2'});
			var s3 = new AWS.S3({params:{Bucket: 'mw-songs'}});
			console.log(song);
			s3.getObject({Key:song.songFd},function(err,response){
				if(err){
					console.log(err,err.stack);
				}
				console.log(response);
				console.log("res: "+res)
				res.send(response);
				res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
					res.write(response);
					res.end();
			})
			
					return res;
			// .on('success',function(response){
			// 	console.log(response);
			// }).send();
			// var SkipperS3 = require('skipper-s3');
			// var fileAdapter = SkipperS3({
			// 	key: apikeys.s3keys[0].key,
			// 	secret: apikeys.s3keys[0].secret,
			// 	bucket: 'mw-songs',
			// 	region: 'Oregon'
			// });
			
			// fileAdapter.read(song.songMP3url)
			// // fileAdapter.read(song.songMP3url)
			// .on('error',function(err){
			// 	console.log('the error is in the on function');
			// 	// return res.serverError(err);
			// })
			// .pipe(res);
		})
	}
};

