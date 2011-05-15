describe("CurrentBuild", function() {
  var currentBuild, options,
      projectName = 'Android app';

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/project.html');
    currentBuild = new CurrentBuild('#project_name', projectName);
  });

  describe("#initialize", function() {
    it("inserts a new project html block", function() {
      expect($('.current_build .name')).toExist();
      expect($('.current_build .time')).toExist();
      expect($('.current_build .message')).toExist();
    });

    it("inserts the build name in the header", function() {
      expect($('.project .current_build .name')).toHaveText(projectName);
    });

    it("creates a TicketReferencer", function() {
      var ticketReferencerSpy = spyOn(window, 'TicketReferencer');
      new CurrentBuild('#project_name', projectName);
      expect(ticketReferencerSpy).toHaveBeenCalledWith('#project_name .current_build');
    });
  });

  describe("#refresh", function() {
    var parsedResults = { status:'success', duration:10, commitMessage:'This is the commit message' };

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

    it("calls to the ticketReferencer with the comment message", function() {
      ticketReferencerSpy = spyOn(currentBuild.ticketReferencer, 'findAndInsert');
      currentBuild.setCommitMessage(commitMessage);
      expect(ticketReferencerSpy).toHaveBeenCalledWith(commitMessage);
    });

    describe("When the message is undefined", function() {
      it("returns false", function() {
        var result = currentBuild.setCommitMessage(undefined);
        expect(result).toBeFalsy();
      });
    });

    describe("When the message is defined", function() {
      it("inserts the passed commit message into the commit message div", function() {
        currentBuild.setCommitMessage(commitMessage);
        expect($('.current_build .message').text()).toMatch(new RegExp(commitMessage));
      });
    });
  });
});
