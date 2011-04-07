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

  describe("#render", function() {
    it("inserts a new project html block", function() {
      project.render();
      expect($('.project .frame')).toExist();
    });

    it("inserts an underscore separated project id", function() {
      project.render();
      expect($('#Sample_Build')).toExist();
    });

    it("renders the current build", function() {
      var currentBuildRenderSpy = spyOn(project.currentBuild, 'render');
      project.render();
      expect(currentBuildRenderSpy).toHaveBeenCalled();
    });

    it("renders the build historian", function() {
      var buildHistorianRenderSpy = spyOn(project.buildHistorian, 'render');
      project.render();
      expect(buildHistorianRenderSpy).toHaveBeenCalled();
    });
  });

  describe("#playSound", function() {
		describe("when there have not been 5 successfully builds in a row", function() {
			it("plays the success sound when the status is 'success' and the previous status was not success", function() {
				var successAudioSpy = spyOn(Audio.success, 'play');
				project.status = 'failure';
				project.playSound('success');

				expect(successAudioSpy).toHaveBeenCalled();
			});
		});

		describe("when there have been 5 success builds in a row", function() {
			it("plays the continuing success sound when the new status is 'success'", function() {
				var continuingSuccessAudioSpy = spyOn(Audio.continuingSuccess, 'play');
				$.each([1, 2, 3, 4, 5, 6], function() {
					project.responseHandler({ status:'building', commitMessage:'', duration:'3000'});
					project.responseHandler({ status:'success', commitMessage:'', duration:'3000'});
				});
				expect(continuingSuccessAudioSpy.callCount).toEqual(1);
			});
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
    var ascendSpy;
    
    beforeEach(function() {
      ascendSpy = spyOn($.fn, 'ascend');
      project.render();
    });
    
    describe("when the new status is different from the past status", function() {
      beforeEach(function() {
        project.status = 'success';
      });

      it("calls to the ascend jQuery plugin", function() {
        project.reactVisually('building');
        expect(ascendSpy).toHaveBeenCalled();
      });
    });
    
    describe("when the new status is 'building'", function() {
      it("shows the commit message", function() {
        project.reactVisually('building');
        expect($('#Sample_Build .message')).toBeVisible();
      });
    });

    describe("when the new status is the same as the past status", function() {
      beforeEach(function() {
        project.status = 'success';
      });

      it("does not call to the ascend jQuery plugin", function() {
        project.reactVisually('success');
        expect(ascendSpy).not.toHaveBeenCalled();
      });

      it("does not show the commit message", function() {
        project.reactVisually('success');
        expect($('#Sample_Build .message')).toBeHidden();
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

    describe("when a url is provided", function() {
      it("makes the request to the project url", function() {
        project.update();
        expect(getSpy.mostRecentCall.args[0]).toEqual(project_config.url);
      });
    });

    describe("when a url is not provided", function() {
      var projectWithNoUrl;

      beforeEach(function() {
        config = project_config;
        config.url = null;
        projectWithNoUrl = new Project(config);
      });

      it("doesn't makes a request", function() {
        projectWithNoUrl.update();
        expect(getSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("#responseHandler", function() {
    var parsedResults = { status:'success', duration:10, commitMessage:'This is the commit message' };

    it("calls to current build to update the the most recent build information", function() {
      var refreshSpy = spyOn(project.currentBuild, 'refresh');
      project.responseHandler(parsedResults);
      expect(refreshSpy).toHaveBeenCalledWith(parsedResults);
    });

    it("calls to recordHistory with the new status", function() {
      var recordHistorySpy = spyOn(project, 'recordHistory');
      project.responseHandler(parsedResults);
      expect(recordHistorySpy).toHaveBeenCalledWith('success');
    });

    it("calls to reactVisually with the new status", function() {
      var reactVisuallySpy = spyOn(project, 'reactVisually');
      project.responseHandler(parsedResults);
      expect(reactVisuallySpy).toHaveBeenCalledWith('success');
    });
  });
});
