function CurrentBuild(projectSelector, projectName) {
  var currentBuildSelector = projectSelector + ' .current_build',
      buildDurationSelector = projectSelector + ' .current_build .time';

  function convertDurationToSeconds(duration) {
    return Math.round(parseInt(duration) / 1000);
  }
  
  $.template("currentBuild", "<div class='current_build'><h3 class='name'>${projectName}</h3><p class='time'></p><div class='clear'></div>");

  return {
    buildAndInsertElements: function() {
      $.tmpl('currentBuild', {projectName: projectName}).appendTo(projectSelector);
    },

    setStatus: function(newStatus) {
      $(currentBuildSelector).removeClass('failure building success');
      $(currentBuildSelector).addClass(newStatus);
    },

    setDuration: function(duration) {
      duration = convertDurationToSeconds(duration);
      var durationText = (duration > 0 ? duration + ' sec' : '');
      $(buildDurationSelector).text(durationText);
    }
  };
}