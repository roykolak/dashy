function BuildHistorian(projectSelector) {
  var historySelector =  projectSelector + ' .history';

  function checkIfOutOfRoom() {
    var stateWidth = $('.status').outerWidth(true);
    var numberOfStates = $(historySelector).children().length;
    var historyWidth = $(historySelector).width();

    return (numberOfStates >= Math.floor(historyWidth/stateWidth) ? true : false);
  }

  return {
    buildAndInsertElements: function() {
      var historyElement = $(document.createElement('ol'));
      $(historyElement).addClass('history');
      $(projectSelector).append(historyElement);
    },

    addState: function(state) {
      if(checkIfOutOfRoom()) {
        this.removeOldestBuildState();
      }

      var stateElement = this.buildStateElement();
      $(stateElement).addClass(state).text(state);

      $(stateElement).prependTo(historySelector);
    },

    buildStateElement: function() {
      var element = $(document.createElement('li'));
      $(element).addClass('status');
      return element;
    },

    removeOldestBuildState: function() {
      $(historySelector).children().last().remove();
    }
  }
}