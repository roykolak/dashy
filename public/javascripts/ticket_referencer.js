function TicketReferencer(currentBuildSelector) {
  var buildTicketsSelector = currentBuildSelector + ' .tickets';

  $.tmpl("<ul class='tickets'></ul>").appendTo(currentBuildSelector);

  return {
    findAndInsert: function(commitMessage) {
      $(buildTicketsSelector).html('');
      var tickets = this.findTicketReferences(commitMessage);
      if(tickets.length > 0) {
        this.setTicketReferences(tickets);
      }
    },

    setTicketReferences: function(tickets) {
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
