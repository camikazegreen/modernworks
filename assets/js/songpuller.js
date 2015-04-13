 $(document).ready(function(){

    document.querySelector('input[type="file"]').onchange = function(e) {
      id3(this.files[0], function(err, tags) {
        console.log(tags)  // tags now contains your ID3 tags 
        var arrayBufferView = new Uint16Array(tags.v2.image.data);
        var blob = new Blob([arrayBufferView],{type:"image/jpeg"});
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img = document.querySelector("#coverArt");
        img.src = imageUrl;


    });
}
}) //closing document.ready