describe("Dashboard", function() {
  var dashboard;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/configurable_elements.html');
    dashboard = new Dashboard(config);
  });

  describe("#initialize", function() {
    it("sets the h1 title to the title in the config", function() {
      expect($('#title')).toHaveText(config.title);
    });

    it("inserts an audio tag sourced to the continuing success sound file", function() {
      expect($('#continuing_success').attr('src')).toEqual('sounds/continuing_success.mp3');
    });

    it("inserts an audio tag sourced to the success sound file", function() {
      expect($('#success').attr('src')).toEqual('sounds/success.mp3');
    });

    it("inserts an audio tag sourced to the building sound file", function() {
      expect($('#building').attr('src')).toEqual('sounds/building.mp3');
    });

    it("inserts an audio tag sourced to the failure sound file", function() {
      expect($('#failure').attr('src')).toEqual('sounds/failure.mp3');
    });

    it("stores the initialized pings", function() {
      expect(dashboard.pings.length > 0).toBeTruthy();
    });

    it("stores the initialized projects", function() {
      expect(dashboard.projects.length > 0).toBeTruthy();
    });
  });

  describe("#start", function() {
    it("calls refresh", function() {
      var refreshSpy = spyOn(dashboard, 'refresh');
      dashboard.start();
      expect(refreshSpy).toHaveBeenCalled();
    });

    it("sets a refresh interval", function() {
      var setIntervalSpy = spyOn(window, 'setInterval');
      dashboard.start();
      expect(setIntervalSpy.argsForCall[0][0]).toBeTruthy();
      expect(setIntervalSpy.argsForCall[0][1]).toEqual(config.refreshInterval);
    });
  });

  describe("#getState", function() {
    describe("when everything is passing", function() {
      it("returns true", function() {
        dashboard.projects[0].status = 'success';
        dashboard.pings[0].status = 'success';
        expect(dashboard.getState()).toEqual(true);
      });
    });

    describe("when a project is failing", function() {
      it("returns false", function() {
        dashboard.projects[0].status = 'failure';
        dashboard.pings[0].status = 'success';
        expect(dashboard.getState()).toEqual(false);
      });
    });

    describe("when a ping is failing", function() {
      it("returns false", function() {
        dashboard.projects[0].status = 'success';
        dashboard.pings[0].status = 'failure';
        expect(dashboard.getState()).toEqual(false);
      });
    });
  });

  describe("#startProgressBarAnimation", function() {
    it("animates the progres bar", function() {
      var animateSpy = spyOn($.fn, 'animate');
      dashboard.startProgressBarAnimation();
      expect(animateSpy.mostRecentCall.args[0]).toEqual({width:'100%'});
      expect(animateSpy.mostRecentCall.args[1]).toEqual(config.refreshInterval - 1000);
    });
  });

  describe("#refresh", function() {
    it("calls to startProgressBarAnimation", function() {
      var startProgressBarAnimationSpy = spyOn(dashboard, 'startProgressBarAnimation');
      dashboard.refresh();
      expect(startProgressBarAnimationSpy).toHaveBeenCalled();
    });

    it("calls to refreshProjects", function() {
      var refreshProjectsSpy = spyOn(dashboard, 'refreshProjects');
      dashboard.refresh();
      expect(refreshProjectsSpy).toHaveBeenCalled();
    });

    it("calls to refreshPings", function() {
      var refreshPingsSpy = spyOn(dashboard, 'refreshPings');
      dashboard.refresh();
      expect(refreshPingsSpy).toHaveBeenCalled();
    });

    it("calls to checkForDashboardChanges", function() {
      var checkForDashboardChangesSpy = spyOn(dashboard, 'checkForDashboardChanges');
      dashboard.refresh();
      expect(checkForDashboardChangesSpy).toHaveBeenCalled();
    });

    it("calls to updateFavicon", function() {
      var updateFaviconSpy = spyOn(dashboard, 'updateFavicon');
      dashboard.refresh();
      expect(updateFaviconSpy).toHaveBeenCalled();
    });
  });

  describe("#updateFavicon", function() {
    beforeEach(function() {
      loadFixtures('spec/javascripts/fixtures/header.html');
    });

    describe("when the state is passing", function() {
      it("sets the favicon to passing image", function() {
        spyOn(dashboard, 'getState').andReturn(true);
        dashboard.updateFavicon();
        expect($("link[rel=icon]").attr('href')).toEqual('images/success.png');
      });
    });

    describe("when the state is failure", function() {
      it("sets the favicon to failure image", function() {
        spyOn(dashboard, 'getState').andReturn(false);
        dashboard.updateFavicon();
        expect($("link[rel=icon]").attr('href')).toEqual('images/failure.png');
      });
    });
  });

  describe("#checkForDashboardChanges", function() {
    it("makes a request for the refresh asset", function() {
      var getSpy = spyOn($, 'get');
      dashboard.checkForDashboardChanges();
      expect(getSpy.mostRecentCall.args[0]).toEqual('refresh.txt');
    });
  });
});
