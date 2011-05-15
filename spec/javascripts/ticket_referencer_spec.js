describe("TicketReferencer", function() {
  var ticketReferencer;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/ticket_referencer.html');
    ticketReferencer = new TicketReferencer('.current_build');
  });

  describe("#initialize", function() {
    it("inserts the tickets html", function() {
      expect($('.current_build .tickets')).toExist();
    });
  });

  describe("#findAndInsert", function() {
    it("clears past ticket number", function() {
      $('.current_build .tickets').html('<li>#13</li>');
      ticketReferencer.findAndInsert('');
      expect($('.current_build .tickets').html()).toEqual('');
    });

    describe("setting ticket references", function() {
      var setTicketReference;

      beforeEach(function() {
        setTicketReferencesSpy = spyOn(ticketReferencer, 'setTicketReferences');
      });

      describe("when tickets are found in the commit message", function() {
        it("calls to setTicketReferences", function() {
          ticketReferencer.findAndInsert('a commit message #4');
          expect(setTicketReferencesSpy).toHaveBeenCalled();
        });
      });

      describe("when tickets are not found in the commit message", function() {
        it("does not call to setTicketReferences", function() {
          ticketReferencer.findAndInsert('a commit message');
          expect(setTicketReferencesSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("#setTicketReferences", function() {
    describe("when an empty array of ticket references are provided", function() {
      it("does not insert a ticket element", function() {
        ticketReferencer.setTicketReferences([]);
        expect($('.current_build .ticket')).not.toExist();
      });
    });

    describe("when an array containing a referenced ticket is provided", function() {
      it("inserts a new ticket element containing the ticket number", function() {
        ticketReferencer.setTicketReferences(["#432"]);
        expect($('.current_build .tickets .ticket')).toHaveText('#432');
      });
    });

    describe("when an array containing multiple referenced tickets is provided", function() {
      it("inserts a new ticket element containing the ticket number for each ticket provided", function() {
        var tickets = ['#23', '#5', '#122'];
        ticketReferencer.setTicketReferences(tickets);
        $.each(tickets, function(i, ticket) {
          expect($($('.current_build .ticket')[i])).toHaveText(ticket);
        });
      });
    });
  });

  describe("#findTicketReferences", function() {
    describe("when a ticket is not referenced in a commit", function() {
      it("returns an empty array", function() {
        expect(ticketReferencer.findTicketReferences("No references here")).toEqual([]);
      });
    });

    describe("when a ticket is referenced in a commit", function() {
      var ticket, commitMessage;

      beforeEach(function() {
        ticket = "#453";
        commitMessage = "This commit references an important issue " + ticket;
      });

      it("returns an array containing the referenced ticket number", function() {
        expect(ticketReferencer.findTicketReferences(commitMessage)).toEqual([ticket]);
      });
    });

    describe("when multiple tickets are references in a commit", function() {
      var tickets, commitMessage;

      beforeEach(function() {
        tickets = ['#432', '#43', '#5'];
        commitMessage = "This commit references many importanct issues";
        $.each(tickets, function(i, ticket) {
          commitMessage = commitMessage + " " + ticket;
        });
      });

      it("returns an array containing all the referenced issue numbers", function() {
        expect(ticketReferencer.findTicketReferences(commitMessage)).toEqual(tickets);
      });
    });
  });
});
