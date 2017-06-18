
$(function() {

  $.ajax({
    type: 'GET',
    url: 'http://archillect.com',
    success: function(body) {
      const images = []
      const parsedBody = $.parseHTML(body)
      for(let i = 0; i < 3; i++) {
        const imgUrl = 'http://archillect.com/' + $(parsedBody).find('#container a')[i].innerText.trim()
        const thumbSrc = $(parsedBody).find('#container img')[i].src
        console.log(thumbSrc)
        const imgSrc = thumbSrc.slice(0, -8) + '1280' + thumbSrc.slice(-4)
        $('#image'+[i]).append("<a href=" + imgUrl + "><img src="+ imgSrc + "></img></a>")
      }
    }
  })
})
