describe("Ping", function() {
  var ping_config = config.pings[0];

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/pings.html');
    ping = new Ping(ping_config);
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

    it("removes 'building', and 'success' classes from the project", function() {
      ping.setStatus('failure');
      ping.setStatus('success');
      ping.setStatus('status');
      expect($('.current_build').hasClass('building success')).toBeFalsy();
    });

    it("adds a 'success' class to a project when it is successfully built", function() {
      ping.setStatus('success');
      expect($('.current_build').hasClass('success')).toBeTruthy();
    });

    it("adds a 'failure' class to a project when it failed to build", function() {
      ping.setStatus('failure');
      expect($('.current_build').hasClass('failure')).toBeTruthy();
    });

    it("sets the previous build status w/ the passed build status", function() {
      ping.setStatus('success');
      expect(ping.previousBuild).toEqual('success');
    });

    it("blinks a few times when a new status is set", function() {
      var twinkleSpy = spyOn($.fn, 'twinkle');

      ping.setStatus('failure');
      ping.setStatus('success');

      expect(twinkleSpy).toHaveBeenCalled();
    });

    describe("sounds", function() {
      describe("the failure sound", function() {
        var failureAudioSpy;

        beforeEach(function() {
          failureAudioSpy = spyOn(Audio.failure, "play");
        });

        it("plays the failure sound when the status is 'failure' and the previous status was not failure", function() {
          ping.setStatus('success');
          ping.setStatus('failure');
          expect(failureAudioSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe("#update", function() {
    var getSpy;

    beforeEach(function() {
      getSpy = spyOn($, 'get');
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