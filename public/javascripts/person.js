function Person(twitterName) {  
  var personElement = $(document.createElement('li')),
      wrapperElement = $(document.createElement('div')),
      imageElement = $(document.createElement('img')),
      nameElement = $(document.createElement('h3')),
      messageElement = $(document.createElement('p'));
      
  $(personElement).addClass('person').addClass('success');
  $(wrapperElement).addClass('wrapper');
  
  $(imageElement).addClass('image').attr('src','images/smileys/happy.png');
  $(wrapperElement).append(imageElement);
  
  $(messageElement).addClass('message');
  $(wrapperElement).append(messageElement);
  
  $(nameElement).addClass('name').text(twitterName);  
  $(wrapperElement).append(nameElement);
  
  $(personElement).append(wrapperElement);
  
  $('#people').append(personElement);
  

  function hasMood(mood, tags) {
    return ($.inArray(mood, tags) != -1);
  }
  
  function moodWasSpecifiedInTags(tags) {
    moodFound = false;
    
    $.each(tags, function(i, tag) {
      if($.inArray(tag, ['happy', 'angry']) != -1) {
        moodFound = true;
        return;
      }
    });
    
    return moodFound;
  }

  return {
    mood:'happy',
    
    setMessage: function(status) {
      $(messageElement).text(status);
    },
    
    madeAnnouncement: function() {
      $('.person').removeClass('announced');
      $(personElement).addClass('announced');
    },
    
    setMood: function(tags) {
      if(moodWasSpecifiedInTags(tags)) {        
        if($.inArray(this.mood, tags) == -1) {
          Audio.moodChange.play();
        }
        
        if(hasMood('happy', tags)) {
          $(imageElement).attr('src', 'images/smileys/happy.png');
          $(personElement).removeClass('failure').addClass('success');
          this.mood = 'happy';
        
        } else if(hasMood('angry', tags)) {
          $(imageElement).attr('src', 'images/smileys/angry.png');
          $(personElement).removeClass('success').addClass('failure');
          this.mood = 'angry';
        
        } else {
          $(imageElement).attr('src', 'images/smileys/happy.png');
          $(personElement).removeClass('failure').addClass('success');
          this.mood = 'happy';
        }
      }
    }
  };
}