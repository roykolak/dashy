function Project(config) {
  var projectId = config.name.replace(/ /g,"_"),
      projectSelector = '#' + projectId,
      projectFrameSelector = projectSelector + ' .frame';

  var buildHistorian = new BuildHistorian(projectFrameSelector),
      currentBuild = new CurrentBuild(projectFrameSelector, config.name),
      statusParser = new StatusParser(config.ci);

  $.template("project", "<li id='${projectId}' class='project'><div class='frame'></div></li>");

  return {
    currentBuild: currentBuild,
    buildHistorian: buildHistorian,
    statusParser: statusParser,
    status: null,

    buildAndInsertElements: function() {
      var addingMethod = (config.url ? 'prependTo' : 'appendTo');
      $.tmpl("project", {projectId: projectId})[addingMethod]('#projects');

      currentBuild.buildAndInsertElements();
      buildHistorian.buildAndInsertElements();
    },

    setStatus: function(newStatus) {
      if(this.status == null) {
        this.status = newStatus;
      }

      this.currentBuild.setStatus(newStatus);
      this.recordHistory(newStatus);
      this.reactVisually(newStatus);
      this.playSound(newStatus);

      this.status = newStatus;
    },

    recordHistory: function(newStatus) {
      if(this.status == 'success' && newStatus != 'success') {
        this.buildHistorian.addState('success');
      } else if(this.status == 'failure' && newStatus != 'failure') {
        this.buildHistorian.addState('failure');
      }
    },

    playSound: function(newStatus) {
      if(this.status != 'success' && newStatus == 'success') {
        Audio.success.play();
      } else if(this.status != 'building' && newStatus == 'building') {
        Audio.building.play();
      } else if(this.status != 'failure' && newStatus == 'failure') {
        Audio.failure.play();
      }
    },

    reactVisually: function(newStatus) {
      if(this.status != newStatus) {
        $(projectSelector).find('.message').show();
        $(projectSelector).ascend(function() {
          $(projectSelector).twinkle();
        });
      }
      if(newStatus != 'building') {
        $(projectSelector).find('.message').hide();
      }
    },

    update: function(data) {
      if(config.url != null) {
        var self = this;
        $.getJSON(config.url, function(data) {
          self.responseHandler(statusParser.parse(data));
        });
      }
    },

    responseHandler: function(response) {
      this.setStatus(response.status);
      this.currentBuild.setDuration(response.duration);
      this.currentBuild.setCommitMessage(response.commitMessage);
    }
  };
}