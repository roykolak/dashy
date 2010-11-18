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
    
    setStatus: function(newStatus) {
      $(buildElement).removeClass('failure building success');
      $(buildElement).addClass(newStatus);
      
      if(typeof(this.status) == 'undefined') {
        this.status = newStatus;
      }
      
      if(this.status != newStatus) {
        $(buildElement).ascend();
        $(buildElement).twinkle();
      };

      this.playSound(this.status, newStatus);
      this.recordHistory(this.status, newStatus);
      
      this.status = newStatus;
    },
    
    playSound: function(status, newStatus) {
      if(status != 'success' && newStatus == 'success') {
        Audio.success.play();
      } else if(status != 'building' && newStatus == 'building') {
        Audio.building.play();
      } else if(status != 'failure' && newStatus == 'failure') {
        Audio.failure.play();
      }
    },
    
    recordHistory: function(status, newStatus) {
      if(status == 'success' && newStatus != 'success') {
        this.buildHistorian.addState('success');
      } else if(status == 'failure' && newStatus != 'failure') {
        this.buildHistorian.addState('failure');
      }
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