function BuildHistorian(projectSelector) {
  var historySelector =  projectSelector + ' .history';

  return {
    maxStates: 12,

    buildAndInsertElements: function() {
      var historyElement = $(document.createElement('ol'));
      $(historyElement).addClass('history');
      $(projectSelector).append(historyElement);
    },

    addState: function(state) {
      if($(historySelector).children().length == this.maxStates) {
        this.removeOldestBuildState();
      }
      var stateElement = this.buildStateElement();
      $(stateElement).addClass(state).text(state);

      $(stateElement).hide().prependTo(historySelector).fadeIn('slow');
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