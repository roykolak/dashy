function Ping(config) {
  var pingElement = $(document.createElement('li')),
      wrapperElement = $(document.createElement('div')),
      buildElement = $(document.createElement('div')),
      nameElement = $(document.createElement('h3'));

  $(pingElement).addClass('ping');
  $(wrapperElement).addClass('wrapper')
  $(buildElement).addClass('current_build');
  $(nameElement).addClass('name').text(config.name);
  $(wrapperElement).append(buildElement, nameElement);
  $(pingElement).append(wrapperElement);
  $('#pings').append(pingElement);
  
  return {
    name:config.name,
    url:config.url + '?jsonp=?',
    
    setStatus: function(status) {
      $(buildElement).removeClass('failure success');
      
      if(status == 'success') {
        $(buildElement).addClass('success');
      } else if(status == 'failure') {
        $(buildElement).addClass('failure');
      }
      
      if(typeof(this.previousBuild) == 'undefined') {
        this.previousBuild = status; 
      }
      
      if (this.previousBuild != status) {
        $(buildElement).twinkle();
      };


      if(this.previousBuild != 'failure' && status == 'failure') {
        Audio.failure.play();
      }
      
      this.previousBuild = status;
    },
    
    update: function(data) {
      if(data.result) {
        var result = (data.result == 'SUCCESS' ? 'success' : 'failure');
        this.setStatus(result);
      }
    }
  }
}