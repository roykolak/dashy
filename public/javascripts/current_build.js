function CurrentBuild(projectSelector, projectName) {
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

  var cssSelector = {
    currentBuild: projectSelector + ' .current_build',
    buildDuration: projectSelector + ' .current_build .time'
  }

  function convertDurationToSeconds(duration) {
    return Math.round(parseInt(duration) / 1000);
  }

  return {
    setStatus: function(newStatus) {
      $(cssSelector.currentBuild).removeClass('failure building success');
      $(cssSelector.currentBuild).addClass(newStatus);
    },

    setDuration: function(duration) {
      duration = convertDurationToSeconds(duration);
      var durationText = (duration > 0 ? duration + ' sec' : '');
      $(cssSelector.buildDuration).text(durationText);
    }
  };
}