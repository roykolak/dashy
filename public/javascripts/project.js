function Project(config) {
  var projectId = config.name.replace(/ /g,"_"),
      projectSelector = '#' + projectId,
      projectFrameSelector = projectSelector + ' .frame';

  var buildHistorian = new BuildHistorian(projectFrameSelector);
  var currentBuild = new CurrentBuild(projectFrameSelector, config.name);
  var statusParser = new StatusParser(config.ci);

  return {
    currentBuild: currentBuild,
    buildHistorian: buildHistorian,
    statusParser: statusParser,

    buildAndInsertElements: function() {
      var projectElement = $(document.createElement('li'));
      var frame = $(document.createElement('div'));
      $(projectElement).addClass('project').attr('id', projectId);
      $(frame).addClass('frame');
      $(projectElement).append(frame);
      $('#projects').append(projectElement);

      currentBuild.buildAndInsertElements();
      buildHistorian.buildAndInsertElements();
    },

    setStatus: function(newStatus) {
      this.currentBuild.setStatus(newStatus);

      if(typeof(this.status) == 'undefined') {
        this.status = newStatus;
      }

      this.recordHistory(this.status, newStatus);

      if(this.status != newStatus) {
        $(projectSelector).ascend(function() {
          $(projectSelector).twinkle();
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
      var self = this;
      $.getJSON(config.url, function(data) {
        self.responseHandler(statusParser.parse(data));
      });
    },

    responseHandler: function(response) {
      this.setStatus(response.status);
      this.currentBuild.setDuration(response.duration);
    }
  };
}