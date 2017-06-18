
$(function() {

  $.ajax({
    type: 'GET',
    url: 'http://archillect.com',
    success: function(body) {
      const parsedBody = $.parseHTML(body)
      const imageContainer = $(parsedBody).find('#container img')
      const linkContainer = $(parsedBody).find('#container a')
      const images = []
      for(let i = 0; i < 3; i++) {
        const imgUrl = 'http://archillect.com/' + linkContainer[i].innerText.trim()
        const thumbSrc = imageContainer[i].src
        const imgSrc = thumbSrc.slice(0, -8) + '1280' + thumbSrc.slice(-4)
        $('#image'+[i]).css("background-image", "url(" + imgSrc + ")")
        $('#linkimage'+[i]).attr("href", imgUrl)
      }
    }
  })
})
