describe("Project", function() {
  var project, options;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/projects.html');
    options = { name:'project build', url:'http://www.buildstatus.com', ci:'Hudson' }
    project = new Project(options);
  });

  describe("#initialize", function() {
    it("initializes a BuildHistorian", function() {
      buildHistorianSpy = spyOn(window, 'BuildHistorian');
      new Project(options);
      expect(buildHistorianSpy).toHaveBeenCalledWith('#project_build .frame');
    });

    it("initializes a CurrentBuild", function() {
      currentBuildSpy = spyOn(window, 'CurrentBuild');
      new Project(options);
      expect(currentBuildSpy).toHaveBeenCalledWith('#project_build .frame', options.name);
    });

    it("initializes a StatusParser", function() {
      statusParserSpy = spyOn(window, 'StatusParser');
      new Project(options);
      expect(statusParserSpy).toHaveBeenCalledWith(options.ci);
    });

    it("stores the url and append jsonp", function() {
      expect(project.url).toEqual('http://www.buildstatus.com?jsonp=?');
    });
  });

  describe("#buildAndInsertElements", function() {
    beforeEach(function() {
      project.buildAndInsertElements();
    });

    it("inserts a new project html block", function() {
      expect($('.project .frame')).toExist();
    });

    it("inserts an underscore separated project id", function() {
      expect($('#project_build')).toExist();
    });

    describe("building and inserting build historian", function() {
      var buildAndInsertForHistorianSpy;

      beforeEach(function() {
        // TODO: wow, there's alot of spying here...
        var buildHistorian = new BuildHistorian('#project_build');
        buildAndInsertForHistorianSpy = spyOn(buildHistorian, 'buildAndInsertElements');
        spyOn(window, 'BuildHistorian').andReturn(buildHistorian);
        var project = new Project(options);
        project.buildAndInsertElements();
      });

      it("builds and inserts the build historian", function() {
        expect(buildAndInsertForHistorianSpy).toHaveBeenCalled();
      });
    });

    describe("building and inserting current build", function() {
      var buildAndInsertForCurrentBuildSpy;

      beforeEach(function() {
        // TODO: wow, there's alot of spying here...
        var currentBuild = new CurrentBuild('#project_build', options.name);
        buildAndInsertForCurrentBuildSpy = spyOn(currentBuild, 'buildAndInsertElements');
        spyOn(window, 'CurrentBuild').andReturn(currentBuild);
        var project = new Project(options);
        project.buildAndInsertElements();
      });

      it("builds and inserts the current build", function() {
        expect(buildAndInsertForCurrentBuildSpy).toHaveBeenCalled();
      });
    });
  });

  describe("#setStatus", function() {
    beforeEach(function() {
      project.buildAndInsertElements();
    });

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
    var parsedResults = { status:'success', duration:10 },
        setStatusSpy, setDurationSpy, parseSpy;

    beforeEach(function() {
      setStatusSpy = spyOn(project, 'setStatus');
      setDurationSpy = spyOn(project.currentBuild, 'setDuration');
      parseSpy = spyOn(project.statusParser, 'parse').andReturn(parsedResults);
    });

    it("calls to statusParser with the response data", function() {
      var responseData = "response data";
      project.update(responseData);
      expect(parseSpy).toHaveBeenCalledWith(responseData);
    });

    it("sets the status of the build to the parsed status", function() {
      project.update();
      expect(setStatusSpy).toHaveBeenCalledWith(parsedResults.status);
    });

    it("calls to current build to set the parsed duration of the build", function() {
      project.update();
      expect(setDurationSpy).toHaveBeenCalledWith(parsedResults.duration);
    });
  });
});