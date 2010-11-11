function BuildHistorian(buildElement) {
  var historyElement = $(document.createElement('ol'));
  $(historyElement).addClass('history');
  $(buildElement).append(historyElement);
  
  return {
    buildElement: buildElement,
    maxStates: 12,
    
    addState: function(state) {
      if($(historyElement).children().length == this.maxStates) {
        this.removeOldestBuildState();
      }
      
      var stateElement = this.buildStateElement();
      $(stateElement).addClass(state).text(state);
      $(historyElement).prepend(stateElement);
    },
    
    buildStateElement: function() {
      var element = $(document.createElement('li'));
      $(element).addClass('status');
      return element;
    },
    
    removeOldestBuildState: function() {
      $(historyElement).children().last().remove();
    }
  }
}