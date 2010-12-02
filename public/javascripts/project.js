function Project(config) {
  var projectElement = $(document.createElement('li')),
      projectId = config.name.replace(/ /g,"_");

  $(projectElement).addClass('project').attr('id', projectId);
  $('#projects').append(projectElement);

  var cssSelector = { project: '#' + projectId }

  return {
    url: config.url + '?jsonp=?',
    currentBuild: new CurrentBuild(cssSelector.project, config.name),
    buildHistorian: new BuildHistorian(cssSelector.project),

    setStatus: function(newStatus) {
      this.currentBuild.setStatus(newStatus);

      if(typeof(this.status) == 'undefined') {
        this.status = newStatus;
      }

      this.recordHistory(this.status, newStatus);

      if(this.status != newStatus) {
        $(cssSelector.project).ascend(function() {
          $(cssSelector.project).twinkle();
        });
      }

      this.playSound(this.status, newStatus);

      this.status = newStatus;
    },

    recordHistory: function(status, newStatus) {
      if(status == 'success' && newStatus != 'success') {
        this.buildHistorian.addState('success');
      } else if(status == 'failure' && newStatus != 'failure') {
        this.buildHistorian.addState('failure');
      }
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

    update: function(data) {
      if(data.building) {
        this.setStatus('building');
      } else {
        var result = (data.result == 'SUCCESS' ? 'success' : 'failure');
        this.setStatus(result);
      }

      this.currentBuild.setDuration(data.duration);
    }
  };
}