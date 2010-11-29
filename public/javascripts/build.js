var documentWidth = $(document).width();

function Build(config) {
  var projectElement = $(document.createElement('li')),
      buildElement = $(document.createElement('div')),
      nameElement = $(document.createElement('h3')),
      timeElement = $(document.createElement('p')),
      clearingElement = $(document.createElement('div')),
      projectId = config.name.replace(/ /g,"_");

  $(projectElement).addClass('project').attr('id', projectId);
  $(buildElement).addClass('current_build');
  $(nameElement).addClass('name').text(config.name);
  $(timeElement).addClass('time');
  $(clearingElement).addClass('clear');
  $(buildElement).append(nameElement).append(timeElement).append(clearingElement);
  $(projectElement).append(buildElement)
  $('#builds').append(projectElement);


  var horizontalPadding = parseInt($(projectElement).css('paddingRight').replace('px', ''), 10) +
                          parseInt($(projectElement).css('paddingLeft').replace('px', ''), 10) +
                          15; // For Large font size
  $(projectElement).css('width', documentWidth - horizontalPadding);

  var cssSelector = {
    project: '#' + projectId,
    currentBuild: '#' + projectId + ' .current_build',
    buildDuration: '#' + projectId + ' .current_build .time'
  }

  function convertDurationToSeconds(duration) {
    return Math.round(parseInt(duration) / 1000);
  }

  return {
    url: config.url + '?jsonp=?',
    buildHistorian: new BuildHistorian(cssSelector.project),

    setStatus: function(newStatus) {
      $(cssSelector.currentBuild).removeClass('failure building success');
      $(cssSelector.currentBuild).addClass(newStatus);

      if(typeof(this.status) == 'undefined') {
        this.status = newStatus;
      }

      this.recordHistory(this.status, newStatus);

      if(this.status != newStatus) {
        $(cssSelector.currentBuild).ascend(function() {
          $($('.builds li').get(0)).children().twinkle();
        });
      };

      this.playSound(this.status, newStatus);

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
      var durationText = (duration > 0 ? duration + ' sec' : '');
      $(cssSelector.buildDuration).text(durationText);
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