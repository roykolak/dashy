function Build(config) {
  var projectElement = $(document.createElement('li')),
      buildElement = $(document.createElement('div')),
      nameElement = $(document.createElement('h3')),
      timeElement = $(document.createElement('p')),
      clearingElement = $(document.createElement('div'));

  $(projectElement).addClass('project')
  $(buildElement).addClass('current_build');
  $(nameElement).addClass('name').text(config.name);
  $(timeElement).addClass('time');
  $(clearingElement).addClass('clear');
  $(buildElement).append(nameElement).append(timeElement).append(clearingElement);
  $(projectElement).append(buildElement)
  $('#builds').append(projectElement);
   
  function convertDurationToSeconds(duration) {
    return Math.round(parseInt(duration) / 1000);
  }
   
  return {
    url: config.url + '?jsonp=?',
    buildHistorian: new BuildHistorian(projectElement),
    
    setStatus: function(status) {
      $(buildElement).removeClass('failure building success');
      
      if(status == 'success') {
        $(buildElement).addClass('success');
      } else if(status == 'building') {
        $(buildElement).addClass('building');
      } else if(status == 'failure') {
        $(buildElement).addClass('failure');
      }
      
      if(typeof(this.previousBuild) == 'undefined') {
        this.previousBuild = status; 
      }
      
      if (this.previousBuild != status) {
        $(buildElement).twinkle();
      };

      // REFACTOR: too busy
      if(this.previousBuild != 'success' && status == 'success') {
        Audio.success.play();
        this.buildHistorian.addState('success');
      } else if(this.previousBuild != 'building' && status == 'building') {
        Audio.building.play();
      } else if(this.previousBuild != 'failure' && status == 'failure') {
        Audio.failure.play();
        this.buildHistorian.addState('failure');
      }
      
      this.previousBuild = status;
    },
    
    setDuration: function(duration) {
      var duration_text = (duration > 0 ? duration + ' sec' : '');
      $(timeElement).text(duration_text);
    },
    
    update: function(data) {
      if(data.building) {
        this.setStatus('building');
      } else {
        var result = (data.result == 'SUCCESS' ? 'success' : 'failure');
        this.setStatus(result);
      }
      
      this.setDuration(convertDurationToSeconds(data.duration));
    }
  };
}