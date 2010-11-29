describe("Build", function() {
  var build, options;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/builds.html');
    options = { name:'project build', url:'http://www.buildstatus.com' }
    build = new Build(options);
  });

  describe("#initialize", function() {
    describe("elements created", function() {
      it("inserts a new project html block", function() {
        expect($('.project .current_build, .project .current_build .name, .project .current_build .time')).toExist();
      });

      it("inserts an underscore separated project id", function() {
        expect($('#project_build')).toExist();
      });

      it("inserts the build name in the header", function() {
        expect($('.project .current_build .name')).toHaveText('project build');
      });
    });

    it("initializes a BuildHistorian", function() {
      expect(build.buildHistorian).toBeDefined();
    });

    it("stores the url and append jsonp", function() {
      expect(build.url).toEqual('http://www.buildstatus.com?jsonp=?');
    });
  });



  describe("#playSound", function() {
    it("plays the success sound when the status is 'success' and the previous status was not success", function() {
      var successAudioSpy = spyOn(Audio.success, 'play');
      build.playSound('failure', 'success')

      expect(successAudioSpy).toHaveBeenCalled();
    });

    it("plays the building sound when the status is 'building' and the previous status was not building", function() {
      var buildingAudioSpy = spyOn(Audio.building, 'play');
      build.playSound('success', 'building');
      expect(buildingAudioSpy).toHaveBeenCalled();
    });

    it("plays the failure sound when the status is 'failure' and the previous status was not failure", function() {
      var failureAudioSpy = spyOn(Audio.failure, "play");
      build.playSound('success', 'failure');
      expect(failureAudioSpy).toHaveBeenCalled();
    });
  });

  describe("#recordHistory", function() {
    var buildHistorianSpy;

    beforeEach(function() {
      buildHistorianSpy = spyOn(build.buildHistorian, 'addState');
    });

    it("calls to the build historian when the previous status is success and the new status is not success", function() {
      build.recordHistory('success', 'failure');
      expect(buildHistorianSpy).toHaveBeenCalledWith('success');
    });

    it("calls to the build historian when the previous status is failure and the new status is not failure", function() {
      build.recordHistory('failure', 'success');
      expect(buildHistorianSpy).toHaveBeenCalledWith('failure');
    });
  });

  describe("#setStatus", function() {
    it("removes 'failure', 'building', and 'success' classes from the project", function() {
      build.setStatus('failure');
      build.setStatus('building');
      build.setStatus('success');
      build.setStatus('status');
      expect($('.current_build').hasClass('failure building success')).toBeFalsy();
    });

    it("adds the status as a class to a project", function() {
      build.setStatus('building');
      expect($('.current_build').hasClass('building')).toBeTruthy();
    });

    it("sets the current status to the passed status", function() {
      build.setStatus('success');
      expect(build.status).toEqual('success');
    });

    describe("when a new status is set", function() {
      it("blinks a few times", function() {
        var twinkleSpy = spyOn($.fn, 'twinkle');

        build.setStatus('success');
        build.setStatus('building');

        expect(twinkleSpy).toHaveBeenCalled();
      });

      it("ascends to the top", function() {
        var ascendSpy = spyOn($.fn, 'ascend');

        build.setStatus('success');
        build.setStatus('building');

        expect(ascendSpy).toHaveBeenCalled();
      });
    });
  });

  describe("#setDuration", function() {
    it("inserts the passed time into the time div and appends time label", function() {
      build.setDuration(5);
      expect($('.current_build .time')).toHaveText('5 sec');
    });

    it("empties the time container if passed zero", function() {
      build.setDuration(0);
      expect($('.current_build .time')).toHaveText('');
    });
  });

  describe("#update", function() {
    var setStatusSpy, setDurationSpy;

    beforeEach(function() {
      setStatusSpy = spyOn(build, 'setStatus');
      setDurationSpy = spyOn(build, 'setDuration');
    });

    it("sets the status of the build to building when it is building", function() {
      build.update({ building:true });
      expect(setStatusSpy).toHaveBeenCalledWith('building');
    });

    it("sets the status of the build to success when it has successfuly built", function() {
      build.update({ building:false, result:'SUCCESS' });
      expect(setStatusSpy).toHaveBeenCalledWith('success');
    });

    it("sets the status of the build to failure when it has failed being built", function() {
      build.update({ building:false, result:'FAILURE' });
      expect(setStatusSpy).toHaveBeenCalledWith('failure');
    });

    it("converts the duration to seconds and calls setDuration w/ the value", function() {
      build.update({ building:false, result:'FAILURE', duration:'5432' });
      expect(setDurationSpy).toHaveBeenCalledWith(5);
    });
  });
});