describe("Ping", function() {
  var ping_config = config.pings[0];

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/pings.html');
    ping = new Ping(ping_config);
  });

  describe("#initialize", function() {
    it("initializes a StatusParser", function() {
      statusParserSpy = spyOn(window, 'StatusParser');
      new Ping(ping_config);
      expect(statusParserSpy).toHaveBeenCalledWith(ping_config.ci);
    });

    it("sets the default status to null", function() {
      expect(ping.status).toEqual(null);
    });
  });

  describe("#buildAndInsertElements", function() {
    beforeEach(function() {
      ping.buildAndInsertElements();
    });

    it("inserts a new ping html block", function() {
      expect($('.ping .current_build, .ping .status')).toExist();
    });

    it("inserts the build name in the header", function() {
      expect($('.ping .name')).toHaveText(ping_config.name);
    });
  });

  describe("#setStatus", function() {
    beforeEach(function() {
      ping.buildAndInsertElements();
    });

    it("sets the ping status to the new status", function() {
      ping.setStatus('success');
      expect(ping.status).toEqual('success');
    });

    it("calls to reactVisually with the newStatus", function() {
      var reactVisuallySpy = spyOn(ping, 'reactVisually');
      ping.setStatus('success');
      expect(reactVisuallySpy).toHaveBeenCalledWith('success');
    });

    it("calls to playSound with the newStatus", function() {
      var playSoundSpy = spyOn(ping, 'playSound');
      ping.setStatus('success');
      expect(playSoundSpy).toHaveBeenCalledWith('success');
    });

    it("calls to updateElementClasses with the newStatus", function() {
      var updateElementClassesSpy = spyOn(ping, 'updateElementClasses');
      ping.setStatus('success');
      expect(updateElementClassesSpy).toHaveBeenCalledWith('success');
    });
  });

  describe("#updateElementClasses", function() {
    beforeEach(function() {
      ping.buildAndInsertElements();
    });

    it("removes 'building', and 'success' classes from the ping", function() {
      ping.updateElementClasses('success');
      expect($('.current_build').hasClass('building success')).toBeFalsy();
    });

    it("adds a 'success' class to a ping when it is successfully built", function() {
      ping.updateElementClasses('success');
      expect($('.current_build').hasClass('success')).toBeTruthy();
    });

    it("adds a 'success' class to a ping when it is building", function() {
      ping.updateElementClasses('building');
      expect($('.current_build').hasClass('success')).toBeTruthy();
    });

    it("adds a 'failure' class to a project when it failed to build", function() {
      ping.updateElementClasses('failure');
      expect($('.current_build').hasClass('failure')).toBeTruthy();
    });
  });

  describe("#playSound", function() {
    var failureAudioSpy;

    beforeEach(function() {
      failureAudioSpy = spyOn(Audio.failure, "play");
    });

    it("plays the failure sound when the status is 'failure' and the previous status was not failure", function() {
      ping.setStatus('success');
      ping.setStatus('failure');
      expect(failureAudioSpy).toHaveBeenCalled();
    });

    it("does not play the failure sound when the status is 'failure' and the previous status was failure", function() {
      ping.setStatus('failure');
      ping.setStatus('failure');
      expect(failureAudioSpy).not.toHaveBeenCalled();
    });
  });

  describe("#reactVisually", function() {
    var twinkleSpy;

    beforeEach(function() {
      twinkleSpy = spyOn($.fn, 'twinkle');
    });

    it("blinks a few times when a new status is set", function() {
      ping.setStatus('failure');
      ping.setStatus('success');
      expect(twinkleSpy).toHaveBeenCalled();
    });

    it("does not blink when a new status is the same as the current status", function() {
      ping.setStatus('success');
      ping.setStatus('success');
      expect(twinkleSpy).not.toHaveBeenCalled();
    });
  });

  describe("#update", function() {
    var getSpy;

    beforeEach(function() {
      getSpy = spyOn($, 'getJSON');
    });

    it("makes the request to the ping url", function() {
      ping.update();
      expect(getSpy.mostRecentCall.args[0]).toEqual(ping_config.url);
    });
  });

  describe("#responseHandler", function() {
    var parsedResults = { status:'success' },
        setStatusSpy;

    beforeEach(function() {
      setStatusSpy = spyOn(ping, 'setStatus');
    });

    it("sets the status of the build to the parsed status", function() {
      ping.responseHandler(parsedResults);
      expect(setStatusSpy).toHaveBeenCalledWith(parsedResults.status);
    });
  });
});