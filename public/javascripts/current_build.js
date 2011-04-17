function CurrentBuild(projectSelector, projectName) {
  var currentBuildSelector = projectSelector + ' .current_build',
      buildDurationSelector = projectSelector + ' .current_build .time',
      buildMessageSelector = projectSelector + ' .current_build .message';
      buildTicketsSelector = projectSelector + ' .current_build .tickets';

  function convertDurationToSeconds(duration) {
    return Math.round(parseInt(duration, 10) / 1000);
  }

  $.template("currentBuild", "<div class='current_build'><h3 class='name'>${projectName}</h3><p class='time'></p><div class='clear'></div><div class='message'></div><ul class='tickets'></ul></div>");

  return {
    render: function() {
      $.tmpl('currentBuild', {projectName: projectName}).appendTo(projectSelector);
    },

    refresh: function(parsedResults) {
      this.setStatus(parsedResults.status);
      this.setDuration(parsedResults.duration);
      this.setCommitMessage(parsedResults.commitMessage);
    },

    setStatus: function(newStatus) {
      $(currentBuildSelector).removeClass('failure building success');
      $(currentBuildSelector).addClass(newStatus);
    },

    setDuration: function(duration) {
      duration = convertDurationToSeconds(duration);
      var durationText = (duration > 0 ? duration + ' sec' : '');
      $(buildDurationSelector).text(durationText);
    },

    setCommitMessage: function(commitMessage) {
      $(buildMessageSelector).text(commitMessage);
      var tickets = this.findTicketReferences(commitMessage);
      if(tickets.length > 0) {
        this.setTicketReferences(tickets);
      }
    },

    setTicketReferences: function(tickets) {
      $(buildTicketsSelector).html('');
      $.each(tickets, function(i, ticket) { 
        $(buildTicketsSelector).append("<li class='ticket'>" + ticket + "</li>");
      });
    },

    findTicketReferences: function(commitMessage) {
      var result = commitMessage.match(/#\d*/g);
      return (result ? result : []);
    }
  };
}
