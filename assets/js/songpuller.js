 $(document).ready(function(){
var j=0;//definied outside of the loop so that each progress bar will have a unique id.
    document.querySelector('input[type="file"]').onchange = function(e) {
        i=0;
        while(i<this.files.length){
      id3(this.files[i], function(err, tags) {
        console.log(tags)  // tags now contains your ID3 tags 
        
        function thisSongDeets(){

            var row = document.getElementById('songDetailTable').insertRow(1);
           var arrayBufferView = new Uint8Array(tags.v2.image.data);
            var blob = new Blob([arrayBufferView],{type:"image/jpeg"});
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            // var img = document.querySelector("#coverArt");
            // img.src = imageUrl; 
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
            progress.setAttribute('id','progress'+j);
            progBox.appendChild(progress);
            postSong(tags);

        };
        thisSongDeets();

    });//closing id3 tagging
    function postSong(tags){
        var file = document.getElementById('fileupload').files[0];
        var formData = new FormData();
        formData.append('songMP3',file,file.name);
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://107.170.53.5:1337/song', true);
        // xhr.onload = function(){
        //     if (xhr.status===200){
        //         console.log("we're all good");
        //     } else {
        //         console.log("an error occurred");
        //     }
        // };
        // xhr.send(formData);
    $.ajax({
        url:'http://107.170.53.5:1337/song?title='+tags.title+'&artist='+tags.artist+'&album='+tags.album+'&year='+tags.year,
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
    });
    function progressHandling(e){
        if(e.lengthComputable){
            $('#progress'+j).attr({value:e.loaded,max:e.total});
        }
    }
};

 i++;j++;
}
}
}) //closing document.ready