function BuildHistorian(projectSelector) {
  var historyElement = $(document.createElement('ol'));
  $(historyElement).addClass('history');
  $(projectSelector).append(historyElement);
  
  var cssSelector = {
    history: projectSelector + ' .history'
  }
  
  return {
    maxStates: 12,
    
    addState: function(state) {
      if($(cssSelector.history).children().length == this.maxStates) {
        this.removeOldestBuildState();
      }
      var stateElement = this.buildStateElement();
      $(stateElement).addClass(state).text(state);
      $(cssSelector.history).prepend(stateElement);
    },
    
    buildStateElement: function() {
      var element = $(document.createElement('li'));
      $(element).addClass('status');
      return element;
    },
    
    removeOldestBuildState: function() {
      $(cssSelector.history).children().last().remove();
    }
  }
}