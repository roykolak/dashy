function Person(twitterName) {  
  var personElement = $(document.createElement('li')),
      divElement = $(document.createElement('div')),
      imageElement = $(document.createElement('img')),
      nameElement = $(document.createElement('h3')),
      messageElement = $(document.createElement('p'));
      
  $(personElement).addClass('person');
  
  $(imageElement).addClass('image').attr('src','images/smileys/default.png');
  $(divElement).append(imageElement);
  
  $(messageElement).addClass('message');
  $(divElement).append(messageElement);
  
  $(personElement).append(divElement);
  
  $(nameElement).addClass('name').text(twitterName);
  $(personElement).append(nameElement);
  
  $('#people').append(personElement);

  function hasMood(mood, tags) {
    return ($.inArray(mood, tags) != -1);
  }

  return {
    setMessage: function(status) {
      $(messageElement).text(status);
    },
    
    setMood: function(tags) {
      if(hasMood('#happy', tags)) {
        $(imageElement).attr('src', 'images/smileys/happy.png');
      } else if(hasMood('#angry', tags)) {
        $(imageElement).attr('src', 'images/smileys/angry.png');
      } else {
        $(imageElement).attr('src', 'images/smileys/happy.png');
      }
    }
  };
}