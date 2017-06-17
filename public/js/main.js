
$(function() {

  $.ajax({
    type: 'GET',
    url: '/archillect',
    success: function(media) {
      for(let i = 0; i < media.length; i++) {
        if(media[i].type === 'image') {
          $('#image'+[i]).append("<a href=" + media[i].source + "><img src="+ media[i].url + "></img></a>")
        }
        if(media[i].type === 'video') {
          $('#image'+[i]).append("<a href=" + media[i].source + "><video autoplay loop><source src=" + media[i].url + " type='video/mp4'></video></a>")
        }
      }
    }
  })
})
