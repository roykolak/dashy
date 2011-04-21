describe("CurrentBuild", function() {
  var currentBuild, options,
      projectName = 'Android app';

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/project.html');
    currentBuild = new CurrentBuild('#project_name', projectName);
  });

  describe("#render", function() {
    it("inserts a new project html block", function() {
      currentBuild.render();
      expect($('.current_build .name')).toExist();
      expect($('.current_build .time')).toExist();
      expect($('.current_build .message')).toExist();
      expect($('.current_build .tickets')).toExist();
    });

    it("inserts the build name in the header", function() {
      currentBuild.render();
      expect($('.project .current_build .name')).toHaveText(projectName);
    });
  });
  
  describe("#refresh", function() {
    var parsedResults = { status:'success', duration:10, commitMessage:'This is the commit message' };
    
    beforeEach(function() {
      currentBuild.render();
    });
    
    it("calls setStatus with new status", function() {
      var setStatusSpy = spyOn(currentBuild, 'setStatus');
      currentBuild.refresh(parsedResults);
      expect(setStatusSpy).toHaveBeenCalledWith(parsedResults.status);
    });
    
    it("calls setDuration with new duration", function() {
      var setDurationSpy = spyOn(currentBuild, 'setDuration');
      currentBuild.refresh(parsedResults);
      expect(setDurationSpy).toHaveBeenCalledWith(parsedResults.duration);
    });
    
    it("calls setCommitMessage with new commit message", function() {
      var setCommitMessageSpy = spyOn(currentBuild, 'setCommitMessage');
      currentBuild.refresh(parsedResults);
      expect(setCommitMessageSpy).toHaveBeenCalledWith(parsedResults.commitMessage);
    });
  });

  describe("#setStatus", function() {
    beforeEach(function() {
      currentBuild.render();
    });
    
    it("removes 'failure', 'building', and 'success' classes from the project", function() {
      currentBuild.setStatus('failure');
      currentBuild.setStatus('building');
      currentBuild.setStatus('success');
      currentBuild.setStatus('status');
      expect($('.current_build').hasClass('failure building success')).toBeFalsy();
    });

    it("adds the status as a class to a project", function() {
      currentBuild.setStatus('building');
      expect($('.current_build').hasClass('building')).toBeTruthy();
    });
  });

  describe("#setDuration", function() {
    beforeEach(function() {
      currentBuild.render();
    });
    
    it("parses and inserts the passed time into the time div and appends time label", function() {
      currentBuild.setDuration(5000);
      expect($('.current_build .time')).toHaveText('5 sec');
    });

    it("empties the time container if passed zero", function() {
      currentBuild.setDuration(0);
      expect($('.current_build .time')).toHaveText('');
    });
  });

  describe("#setCommitMessage", function() {
    var commitMessage = "This is the commit message";
    
    beforeEach(function() {
      currentBuild.render();
    });
    
    it("inserts the passed commit message into the commit message div", function() {
      currentBuild.setCommitMessage(commitMessage);
      expect($('.current_build .message')).toHaveText(commitMessage);
    });

    describe("When the message is undefined", function() {
      it("returns false", function() {
        var result = currentBuild.setCommitMessage(undefined);
        expect(result).toBeFalsy();
      });
    });

    describe("handling ticket references", function() {
      var setTicketReferencesSpy;

      beforeEach(function() {
        setTicketReferencesSpy = spyOn(currentBuild, 'setTicketReferences');  
      });

      describe("when tickets are not referenced in a commit message", function() {
        it("does not set ticket references", function() {
          currentBuild.setCommitMessage(commitMessage);
          expect(setTicketReferencesSpy).not.toHaveBeenCalled();
        });
      });

      describe("when tickets are referenced in a commit message", function() {
        it("calls to setTicketReferences with the found ticket references", function() {
          var tickets = ['#30', '#22'];
          $.each(tickets, function(i, ticket) {
            commitMessage += " " + ticket;
          });
          currentBuild.setCommitMessage(commitMessage);
          expect(setTicketReferencesSpy).toHaveBeenCalledWith(tickets);
        });
      });
    });
  });

  describe("#setTicketReferences", function() {
    beforeEach(function() {
      currentBuild.render();
    });
  
    describe("when an empty array of ticket references are provided", function() {
      it("does not insert a ticket element", function() {
        currentBuild.setTicketReferences([]);
        expect($('.current_build .ticket')).not.toExist();
      });
    });
    
    describe("when an array containing a referenced ticket is provided", function() {
      it("inserts a new ticket element containing the ticket number", function() {
        currentBuild.setTicketReferences(["#432"]);
        expect($('.current_build .tickets .ticket')).toHaveText('#432');
      });
    });

    describe("when an array containing multiple referenced tickets is provided", function() {
      it("inserts a new ticket element containing the ticket number for each ticket provided", function() {
        var tickets = ['#23', '#5', '#122'];
        currentBuild.setTicketReferences(tickets);
        $.each(tickets, function(i, ticket) {
          expect($($('.current_build .ticket')[i])).toHaveText(ticket);
        });
      });
    });

    describe("when ticket references are set multiple times", function() {
      it("clears past ticket references before inserting new references", function() {
        currentBuild.setTicketReferences(['#54', '#43']);
        currentBuild.setTicketReferences(['#44']);
        expect($('.current_build .ticket').length).toEqual(1);
      });
    });
  });

  describe("#findTicketReferences", function() {
    describe("when a ticket is not referenced in a commit", function() {
      it("returns an empty array", function() {
        expect(currentBuild.findTicketReferences("No references here")).toEqual([]);
      });
    });

    describe("when a ticket is referenced in a commit", function() {
      var ticket, commitMessage;
    
      beforeEach(function() {
        ticket = "#453";    
        commitMessage = "This commit references an important issue " + ticket;
      });

      it("returns an array containing the referenced ticket number", function() {
        expect(currentBuild.findTicketReferences(commitMessage)).toEqual([ticket]);
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
        expect(currentBuild.findTicketReferences(commitMessage)).toEqual(tickets);
      });    
    });
  });
});
