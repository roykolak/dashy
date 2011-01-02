function CurrentBuild(projectSelector, projectName) {
  var currentBuildSelector = projectSelector + ' .current_build',
      buildDurationSelector = projectSelector + ' .current_build .time';

  function convertDurationToSeconds(duration) {
    return Math.round(parseInt(duration) / 1000);
  }

  return {
    buildAndInsertElements: function() {
      var buildElement = $(document.createElement('div')),
          nameElement = $(document.createElement('h3')),
          timeElement = $(document.createElement('p')),
          clearingElement = $(document.createElement('div'));

      $(buildElement).addClass('current_build');
      $(nameElement).addClass('name').text(projectName);
      $(timeElement).addClass('time');
      $(clearingElement).addClass('clear');
      $(buildElement).append(nameElement).append(timeElement).append(clearingElement);
      $(projectSelector).append(buildElement);
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