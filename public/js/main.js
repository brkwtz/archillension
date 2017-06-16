$(function() {

  $.ajax({
    type: 'GET',
    url: '/archillect',
    success: imgUrl => {
      console.log(imgUrl)
      $('body').css('background-image', 'url(' + imgUrl + ')')
    }
  })

})
