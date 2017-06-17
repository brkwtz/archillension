
$(function() {

  $.ajax({
    type: 'GET',
    url: 'http://archillect.com',
    success: function(body) {
      const images = []
      const parsedBody = $.parseHTML(body)
      for(let i = 0; i < 3; i++) {
        const imgUrl = 'http://archillect.com/' + $(parsedBody).find('#container a')[i].innerText.trim()
        $.ajax({
          type: 'GET',
          url: imgUrl,
          success: function(body) {
            const parsedBody = $.parseHTML(body)
            const imgSrc = $(parsedBody).find('#ii')[0].src
            $('#image'+[i]).append("<a href=" + imgUrl + "><img src="+ imgSrc + "></img></a>")
          }
        })
      }
    }
  })
})

  //for each image ID ajax call to archillect.com/(imageID) and scrape for image src
  //return image src in object as url
  //return archillect.com/(imageID) in object as src
