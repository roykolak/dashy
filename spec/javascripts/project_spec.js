describe("Project", function() {
  var project, options;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/projects.html');
    options = { name:'project build', url:'http://www.buildstatus.com' }
    project = new Project(options);
  });

  describe("#initialize", function() {
    describe("elements created", function() {
      it("inserts a new project html block", function() {
        expect($('.project')).toExist();
      });

      it("inserts an underscore separated project id", function() {
        expect($('#project_build')).toExist();
      });
    });

    it("initializes a BuildHistorian", function() {
      expect(project.buildHistorian).toBeDefined();
    });

    it("initializes a CurrentBuild", function() {
      expect(project.currentBuild).toBeDefined();
    });

    it("stores the url and append jsonp", function() {
      expect(project.url).toEqual('http://www.buildstatus.com?jsonp=?');
    });
  });

  describe("#setStatus", function() {
    describe("when a new status is set", function() {
      it("blinks a few times", function() {
        var twinkleSpy = spyOn($.fn, 'twinkle');

        project.setStatus('success');
        project.setStatus('building');

        expect(twinkleSpy).toHaveBeenCalled();
      });

      it("ascends to the top", function() {
        var ascendSpy = spyOn($.fn, 'ascend');

        project.setStatus('success');
        project.setStatus('building');

        expect(ascendSpy).toHaveBeenCalled();
      });
    });

    it("calls to setStatus on currentBuild with the new status", function() {
      var setStatusSpy = spyOn(project.currentBuild, 'setStatus');
      project.setStatus('success');
      expect(setStatusSpy).toHaveBeenCalledWith('success');
    });

    it("calls to recordHistory with the current and previous statuses", function() {
      var recordHistorySpy = spyOn(project, 'recordHistory');
      project.setStatus('success');
      project.setStatus('building');
      expect(recordHistorySpy).toHaveBeenCalledWith('success', 'building');
    });
  });

  describe("#playSound", function() {
    it("plays the success sound when the status is 'success' and the previous status was not success", function() {
      var successAudioSpy = spyOn(Audio.success, 'play');
      project.playSound('failure', 'success')

      expect(successAudioSpy).toHaveBeenCalled();
    });

    it("plays the building sound when the status is 'building' and the previous status was not building", function() {
      var buildingAudioSpy = spyOn(Audio.building, 'play');
      project.playSound('success', 'building');
      expect(buildingAudioSpy).toHaveBeenCalled();
    });

    it("plays the failure sound when the status is 'failure' and the previous status was not failure", function() {
      var failureAudioSpy = spyOn(Audio.failure, "play");
      project.playSound('success', 'failure');
      expect(failureAudioSpy).toHaveBeenCalled();
    });
  });

  describe("#recordHistory", function() {
    var buildHistorianSpy;

    beforeEach(function() {
      buildHistorianSpy = spyOn(project.buildHistorian, 'addState');
    });

    it("calls to the build historian when the previous status is success and the new status is not success", function() {
      project.recordHistory('success', 'failure');
      expect(buildHistorianSpy).toHaveBeenCalledWith('success');
    });

    it("calls to the build historian when the previous status is failure and the new status is not failure", function() {
      project.recordHistory('failure', 'success');
      expect(buildHistorianSpy).toHaveBeenCalledWith('failure');
    });
  });

  describe("#update", function() {
    var setStatusSpy, setDurationSpy;

    beforeEach(function() {
      setStatusSpy = spyOn(project, 'setStatus');
      setDurationSpy = spyOn(project.currentBuild, 'setDuration');
    });

    it("sets the status of the build to building when it is building", function() {
      project.update({ building:true });
      expect(setStatusSpy).toHaveBeenCalledWith('building');
    });

    it("sets the status of the build to success when it has successfuly built", function() {
      project.update({ building:false, result:'SUCCESS' });
      expect(setStatusSpy).toHaveBeenCalledWith('success');
    });

    it("sets the status of the build to failure when it has failed being built", function() {
      project.update({ building:false, result:'FAILURE' });
      expect(setStatusSpy).toHaveBeenCalledWith('failure');
    });

    it("calls to currentBuild to set the build duration", function() {
      project.update({ building:false, result:'FAILURE' });
      expect(setDurationSpy).toHaveBeenCalled();
    });
  });
});