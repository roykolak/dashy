function BuildHistorian(buildElement) {
  var historyElement = $(document.createElement('ol'));
  
  $(historyElement).addClass('history');
  $(buildElement).append(historyElement);
  
  return {
    buildElement: buildElement,
    maxStatuses: 12,
    
    addStatus: function(status) {
      var statusElement = $(document.createElement('li'));
      $(statusElement).addClass('status');
      $(statusElement).addClass(status).text(status);
      
      if($(historyElement).children().length == this.maxStatuses) {
        var oldestStatus = $(historyElement).children().last();
        $(oldestStatus).remove();
      }
      $(historyElement).prepend(statusElement);
    }
  }
}