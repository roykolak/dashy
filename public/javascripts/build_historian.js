function BuildHistorian(projectSelector) {
  var historySelector = projectSelector + ' .history',
      states = [],
      continuingSuccessThreshold = 5;

  function checkIfOutOfRoom() {
    if(jQuery.fx.off) {
      return false;
    } else {
      var stateWidth = $('.status').outerWidth(true),
          numberOfStates = $(historySelector).children().length,
          historyWidth = $(historySelector).width();

      return (numberOfStates >= Math.floor(historyWidth/stateWidth) ? true : false);
    }
  }

  $.template('buildHistorian', "<ol class='history'></ol>");
  $.template('buildState', "<li class='status ${state}'>${state}</li>");
  $.tmpl('buildHistorian').appendTo(projectSelector);

  return {
    addState: function(state) {
      if(checkIfOutOfRoom()) {
        this.removeOldestBuildState();
      }

      states.unshift(state);
      $.tmpl('buildState', {state: state}).prependTo(historySelector);
    },

    removeOldestBuildState: function() {
      $(historySelector).children().last().remove();
      states.pop();
    },

    continuingSuccess: function() {
      if(states.length >= continuingSuccessThreshold) {
        return states.slice(0, continuingSuccessThreshold).every(function(build) {
          return build == "success";
        });
      } else {
        return false;
      }
    }
  };
}
