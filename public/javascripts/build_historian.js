function BuildHistorian(projectSelector) {
  var historySelector =  projectSelector + ' .history';

  function checkIfOutOfRoom() {
    var stateWidth = $('.status').outerWidth(true),
        numberOfStates = $(historySelector).children().length,
        historyWidth = $(historySelector).width();

    return (numberOfStates >= Math.floor(historyWidth/stateWidth) ? true : false);
  }
  
  $.template('buildHistorian', "<ol class='history'></ol>");
  $.template('buildState', "<li class='status ${state}'>${state}</li>");

  return {
    render: function() {
      $.tmpl('buildHistorian').appendTo(projectSelector);
    },

    addState: function(state) {
      if(checkIfOutOfRoom()) {
        this.removeOldestBuildState();
      }

      $.tmpl('buildState', {state: state}).prependTo(historySelector);
    },

    removeOldestBuildState: function() {
      $(historySelector).children().last().remove();
    }
  }
}