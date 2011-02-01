describe("Project", function() {
  var project,
      project_config = config.projects[0];

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/projects.html');
    project = new Project(project_config);
  });

  describe("#initialize", function() {
    it("initializes a BuildHistorian", function() {
      buildHistorianSpy = spyOn(window, 'BuildHistorian');
      new Project(project_config);
      expect(buildHistorianSpy).toHaveBeenCalledWith('#Sample_Build .frame');
    });

    it("initializes a CurrentBuild", function() {
      currentBuildSpy = spyOn(window, 'CurrentBuild');
      new Project(project_config);
      expect(currentBuildSpy).toHaveBeenCalledWith('#Sample_Build .frame', project_config.name);
    });

    it("initializes a StatusParser", function() {
      statusParserSpy = spyOn(window, 'StatusParser');
      new Project(project_config);
      expect(statusParserSpy).toHaveBeenCalledWith(project_config.ci);
    });

    it("sets the default status to null", function() {
      expect(project.status).toEqual(null);
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
      expect($('#Sample_Build')).toExist();
    });

    describe("building and inserting build historian", function() {
      var buildAndInsertForHistorianSpy;

      beforeEach(function() {
        // TODO: wow, there's alot of spying here...
        var buildHistorian = new BuildHistorian('#project_build');
        buildAndInsertForHistorianSpy = spyOn(buildHistorian, 'buildAndInsertElements');
        spyOn(window, 'BuildHistorian').andReturn(buildHistorian);
        var project = new Project(project_config);
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
        var currentBuild = new CurrentBuild('#project_build', project_config.name);
        buildAndInsertForCurrentBuildSpy = spyOn(currentBuild, 'buildAndInsertElements');
        spyOn(window, 'CurrentBuild').andReturn(currentBuild);
        var project = new Project(project_config);
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

    it("calls to setStatus on currentBuild with the new status", function() {
      var setStatusSpy = spyOn(project.currentBuild, 'setStatus');
      project.setStatus('success');
      expect(setStatusSpy).toHaveBeenCalledWith('success');
    });

    it("calls to recordHistory with the new status", function() {
      var recordHistorySpy = spyOn(project, 'recordHistory');
      project.setStatus('building');
      expect(recordHistorySpy).toHaveBeenCalledWith('building');
    });

    it("calls to reactVisually with the new status", function() {
      var reactVisuallySpy = spyOn(project, 'reactVisually');
      project.setStatus('building');
      expect(reactVisuallySpy).toHaveBeenCalledWith('building');
    });
  });

  describe("#playSound", function() {
    it("plays the success sound when the status is 'success' and the previous status was not success", function() {
      var successAudioSpy = spyOn(Audio.success, 'play');
      project.status = 'failure';
      project.playSound('success')

      expect(successAudioSpy).toHaveBeenCalled();
    });

    it("plays the building sound when the status is 'building' and the previous status was not building", function() {
      var buildingAudioSpy = spyOn(Audio.building, 'play');
      project.status = 'success';
      project.playSound('building');
      expect(buildingAudioSpy).toHaveBeenCalled();
    });

    it("plays the failure sound when the status is 'failure' and the previous status was not failure", function() {
      var failureAudioSpy = spyOn(Audio.failure, "play");
      project.status = 'success';
      project.playSound('failure');
      expect(failureAudioSpy).toHaveBeenCalled();
    });
  });

  describe("#reactVisually", function() {
    describe("when the new status is different from the past status", function() {
      beforeEach(function() {
        project.status = 'success';
      });

      it("calls to the ascend jQuery plugin", function() {
        var ascendSpy = spyOn($.fn, 'ascend');
        project.reactVisually('building');
        expect(ascendSpy).toHaveBeenCalled();
      });
    });

    describe("when the new status is the same as the past status", function() {
      beforeEach(function() {
        project.status = 'success';
      });

      it("does not call to the ascend jQuery plugin", function() {
        var ascendSpy = spyOn($.fn, 'ascend');
        project.reactVisually('success');
        expect(ascendSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("#recordHistory", function() {
    var buildHistorianSpy;

    beforeEach(function() {
      buildHistorianSpy = spyOn(project.buildHistorian, 'addState');
    });

    it("calls to the build historian when the previous status is success and the new status is not success", function() {
      project.status = 'success'
      project.recordHistory('failure');
      expect(buildHistorianSpy).toHaveBeenCalledWith('success');
    });

    it("calls to the build historian when the previous status is failure and the new status is not failure", function() {
      project.status = 'failure';
      project.recordHistory('success');
      expect(buildHistorianSpy).toHaveBeenCalledWith('failure');
    });
  });

  describe("#update", function() {
    var getSpy;

    beforeEach(function() {
      getSpy = spyOn($, 'getJSON');
    });

    it("makes the request to the project url", function() {
      project.update();
      expect(getSpy.mostRecentCall.args[0]).toEqual(project_config.url);
    });
  });

  describe("#responseHandler", function() {
    var parsedResults = { status:'success', duration:10 },
        setStatusSpy, setDurationSpy;

    beforeEach(function() {
      setStatusSpy = spyOn(project, 'setStatus');
      setDurationSpy = spyOn(project.currentBuild, 'setDuration');
    });

    it("sets the status of the build to the parsed status", function() {
      project.responseHandler(parsedResults);
      expect(setStatusSpy).toHaveBeenCalledWith(parsedResults.status);
    });

    it("calls to current build to set the parsed duration of the build", function() {
      project.responseHandler(parsedResults);
      expect(setDurationSpy).toHaveBeenCalledWith(parsedResults.duration);
    });
  });
});