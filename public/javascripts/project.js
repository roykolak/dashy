function Project(config) {
  var projectId = config.name.replace(/ /g,"_"),
      projectSelector = '#' + projectId,
      projectFrameSelector = projectSelector + ' .frame';

  $.template("project", "<li id='${projectId}' class='project'><div class='frame'></div></li>");

  var addingMethod = (config.url ? 'prependTo' : 'appendTo');
  $.tmpl("project", {projectId: projectId})[addingMethod]('#projects');

  var currentBuild = new CurrentBuild(projectFrameSelector, config.name),
      buildHistorian = new BuildHistorian(projectFrameSelector),
      statusParser = new StatusParser(config.ci);

  return {
    currentBuild: currentBuild,
    buildHistorian: buildHistorian,
    statusParser: statusParser,
    status: null,

    recordHistory: function(newStatus) {
      if(this.status == 'success' && newStatus != 'success') {
        this.buildHistorian.addState('success');
      } else if(this.status == 'failure' && newStatus != 'failure') {
        this.buildHistorian.addState('failure');
      }
    },

    playSound: function(newStatus) {
      if(this.status != 'success' && newStatus == 'success') {
        if(buildHistorian.continuingSuccess()) {
          Audio.continuingSuccess.play();
        } else {
          Audio.success.play();
        }
      } else if(this.status != 'building' && newStatus == 'building') {
        Audio.building.play();
      } else if(this.status != 'failure' && newStatus == 'failure') {
        Audio.failure.play();
      }
    },

    reactVisually: function(newStatus) {
      var visuability = (newStatus != 'building' ? 'hide' : 'show');
      $(projectSelector).find('.message, .tickets')[visuability]();

      if(this.status != newStatus) {
        $(projectSelector).ascend(function() {
          $(projectSelector).twinkle();
        });
      }
    },

    update: function(data) {
      if(config.url !== null) {
        var self = this;
        $.getJSON(config.url, function(data) {
          self.responseHandler(statusParser.parse(data));
        });
      }
    },

    responseHandler: function(response) {
      if(this.status === null) {
        this.status = response.status;
      }

      this.currentBuild.refresh(response);

      this.recordHistory(response.status);
      this.reactVisually(response.status);
      this.playSound(response.status);

      this.status = response.status;
    }
  };
}
