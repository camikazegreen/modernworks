 $(document).ready(function(){
var j=0;//definied outside of the loop so that each progress bar will have a unique id.
    document.querySelector('input[type="file"]').onchange = function(e) {
        i=0;
        while(i<this.files.length){
            var h=j;
        musicmetadata(this.files[i], function(err, tags){
        // id3(this.files[i], function(err, tags) {
        console.log(tags)  // tags now contains your ID3 tags 
        
        function thisSongDeets(){

            var row = document.getElementById('songDetailTable').insertRow(1);
            row.setAttribute('id','row'+tags.title);
            var imageUrl;
           if(tags.picture.length>0){
            var picture = tags.picture[0];
            imageUrl = URL.createObjectURL(new Blob([picture.data],{'type':'image/'+picture.format}));
            } else {
             imageUrl='/images/MW-small.png'
         };
            var albumArt = document.createElement('img');
            albumArt.setAttribute('src',imageUrl);
            albumArt.setAttribute('width','50px');
            var title = document.createElement('h4');
            title.innerHTML = tags.title;
            var artist = document.createElement('h5');
            artist.innerHTML = 'by ' + tags.artist;
            var album = document.createElement('h5');
            album.innerHTML = 'on ' + tags.album;
            var artBox = row.insertCell(0);
            var infoBox = row.insertCell(1);
            var progBox = row.insertCell(2);
            artBox.appendChild(albumArt);
            infoBox.appendChild(title);
            infoBox.appendChild(artist);
            infoBox.appendChild(album);
            var progress = document.createElement('progress');
            progress.setAttribute('id','progress'+h);
            progBox.appendChild(progress);
            postSong(tags);

        };
        thisSongDeets();

    });//closing id3 tagging
    function postSong(tags){
        var file = document.getElementById('fileupload').files[0];
        var formData = new FormData();
        formData.append('songMP3',file,file.name);

    $.ajax({
        url:'http://107.170.53.5:1337/song?title='+encodeURIComponent(tags.title)+'&artist='+encodeURIComponent(tags.artist)+'&album='+encodeURIComponent(tags.album),
        type: 'POST',
        xhr: function(){
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',progressHandling, false);
            }
            return myXhr;
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(result){
        console.log(result);
        row=document.getElementById('row'+result.status.title);
        var musicbrainzBox = row.insertCell(3);
        var mbid = JSON.parse(result.status.mbid);
        // player.setAttribute('src','song/songMP3');
        var mbidHTML = '<p>ID:'+mbid.id+'</p>';
        console.log(mbid);
        if(mbid.id == 'no song found'){
            mbidHTML = '<a href="http://musicbrainz.org/search?query='+encodeURIComponent(title)+'&type=recording&method=indexed" target="_blank">Search by song</a></br><a href="http://musicbrainz.org/search?query='+encodeURIComponent(album)+'&type=release&method=indexed target="_blank"">Search by album</a></br><a href="http://musicbrainz.org/search?query='+encodeURIComponent(artist)+'&type=artist&method=indexed" target="_blank">Search by artist</a></br>'
        }
        var w=0;
        console.log(mbid.writers);
        while(w<mbid.writers.length){
            mbidHTML+='<p>Writer:'+mbid.writers[w]+'</p>';
            w++;
        }
        var c=0;
        while(c<mbid.composers.length){
            mbidHTML+='<p>Composer:'+mbid.composers[c]+'</p>';
            c++;
        }
        musicbrainzBox.innerHTML=mbidHTML;
        var echoBox = row.insertCell(4);
        var echoDeets = JSON.parse(result.status.echonest);
        var echoHTML ='<p>Energy:<progress value="'+echoDeets.energy+'" max="1"</progress></p>';
        echoHTML +='<p>Liveness:<progress value="'+echoDeets.liveness+'" max="1"</progress></p>';
        echoHTML +='<p>Tempo:<progress value="'+echoDeets.tempo+'" max="150"</progress></p>';
        echoHTML +='<p>Speechiness:<progress value="'+echoDeets.speechiness+'" max="1"</progress></p>';
        echoHTML +='<p>Acousticness:<progress value="'+echoDeets.acousticness+'" max="1"</progress></p>';
        echoHTML +='<p>Instrumentalness:<progress value="'+echoDeets.instrumentalness+'" max="1"</progress></p>';
        // echoHTML +='<p>Loudness:<progress value="'+echoDeets.loudness+'" max="1"</progress></p>';
        echoHTML +='<p>Valence:<progress value="'+echoDeets.valence+'" max="1"</progress></p>';
        echoHTML +='<p>Danceability:<progress value="'+echoDeets.danceability+'" max="1"</progress></p>';

        echoBox.innerHTML=echoHTML;
    });
    function progressHandling(e){
        if(e.lengthComputable){
            $('#progress'+h).attr({value:e.loaded,max:e.total});
        }
    }
};

 i++;j++;
}
}
}) //closing document.ready