
$(function() {

  $.ajax({
    type: 'GET',
    url: '/archillect',
    success: function(media) {
      for(let i = 0; i < media.length; i++) {
        if(media[i].type === 'image') {
          $('#image'+[i]).append('<img src='+ media[i].url + '></img>')
        }
        if(media[i].type === 'video') {
          $('#image'+[i]).append("<video autoplay loop><source src=" + media[i].url + " type='video/mp4'></video>")
        }
      }
    }
  })
})
