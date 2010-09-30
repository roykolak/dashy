function Build(config) {
  var buildElement = $(document.createElement('li')),
      nameElement = $(document.createElement('h3')),
      timeElement = $(document.createElement('p')),
      clearingElement = $(document.createElement('div'));

  $(buildElement).addClass('build');
  $(nameElement).addClass('name').text(config.name);
  $(timeElement).addClass('time');
  $(clearingElement).addClass('clear');
  $(buildElement).append(nameElement).append(timeElement).append(clearingElement);
  $('#builds').append(buildElement);
   
  return {
    setStatus: function(status) {
      $(buildElement).removeClass('failure building success');
      
      if(status == 'success') {
        $(buildElement).addClass('success');
      } else if(status == 'building') {
        $(buildElement).addClass('building');
      } else if(status == 'failure') {
        $(buildElement).addClass('failure');
      }
    },
    
    setDuration: function(duration) {
      var duration_text = '';
      if(duration > 0) {
        duration_text = duration + ' sec';
      }
      
      $(timeElement).text(duration_text);
    }
  };
}