 $(document).ready(function(){

    document.querySelector('input[type="file"]').onchange = function(e) {
      id3(this.files[0], function(err, tags) {
        console.log(tags)  // tags now contains your ID3 tags 
        
        function thisSongDeets(){
           var arrayBufferView = new Uint16Array(tags.v2.image.data);
            var blob = new Blob([arrayBufferView],{type:"image/jpeg"});
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            // var img = document.querySelector("#coverArt");
            // img.src = imageUrl; 
            var albumArt = document.createElement('img');
            albumArt.setAttribute('src',imageUrl);
            albumArt.setAttribute('width','50px');
            var title = document.createElement('h3');
            title.innerHTML = tags.title;
            var artist = document.createElement('h4');
            artist.innerHTML = 'by ' + tags.artist;
            var album = document.createElement('h4');
            album.innerHTML = 'on ' + tags.album;
            var infoBox = document.createElement('div');
            infoBox.appendChild(albumArt);
            infoBox.appendChild(title);
            infoBox.appendChild(artist);
            infoBox.appendChild(album);
            document.getElementById('songDetails').appendChild(infoBox);
        };
        thisSongDeets();

    });
}
}) //closing document.ready