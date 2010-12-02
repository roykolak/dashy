describe("Loader", function() {
  var config, loader;

  beforeEach(function() {
    config = {
      projects: [{ name:'Sweet Project', url:'http://www.buildresults.com/project'}],
      pings: [{ name:'Server 1', url:'http://www.server1.com/'}]
    };
    loader = new Loader(config);
  });

  describe("#initialize", function() {
    it("stores the passed config options", function() {
      expect(loader.config).toEqual(config);
    });

    it("sets the refresh interval to 5 seconds", function() {
      expect(loader.refreshInterval).toEqual(5000);
    });
  });

  describe("#loadPings", function() {
    var pingSpy;

    beforeEach(function() {
      pingSpy = spyOn(window, 'Ping');
      loader.loadPings();
    });

    it("initializes pings", function() {
      expect(pingSpy).toHaveBeenCalledWith(config.pings[0]);
    });

    it("stores the initialized pings", function() {
      expect(loader.pings.length).toBe(1);
    });
  });

  describe("#loadProjects", function() {
    var projectSpy;

    beforeEach(function() {
      projectSpy = spyOn(window, 'Project');
      loader.loadProjects();
    });

    it("initializes projects", function() {
      expect(projectSpy).toHaveBeenCalledWith(config.projects[0]);
    });

    it("stores the initialized projects", function() {
      expect(loader.projects.length).toBe(1);
    });
  });

  describe("#refreshBuilds", function() {
    var data, getJSONSpy;

    beforeEach(function() {
      data = { result: 'SUCCESS' };
      getJSONSpy = spyOn($, 'getJSON');
      loader.loadProjects();
      loader.refreshProjects();
    });

    it("makes a request to the build server using the stored url for the project", function() {
      expect(getJSONSpy.mostRecentCall.args[0]).toEqual(config.projects[0].url + '?jsonp=?');
    });
  });

  describe("#refreshPings", function() {
    var data, getJSONSpy;

    beforeEach(function() {
      data = { result: 'SUCCESS' };
      getJSONSpy = spyOn($, 'getJSON');
      loader.loadPings();
      loader.refreshPings();
    });

    it("makes a request to the build server using the stored url for the project", function() {
      expect(getJSONSpy.mostRecentCall.args[0]).toEqual(config.pings[0].url + '?jsonp=?');
    });
  });

  describe("#startProgressBarAnimation", function() {
    it("animates the progres bar", function() {
      var animateSpy = spyOn($.fn, 'animate');
      loader.startProgressBarAnimation();
      expect(animateSpy).toHaveBeenCalled();
    });
  });

  describe("#refresh", function() {
    it("calls to startProgressBarAnimation", function() {
      var startProgressBarAnimationSpy = spyOn(loader, 'startProgressBarAnimation');
      loader.refresh();
      expect(startProgressBarAnimationSpy).toHaveBeenCalled();
    });

    it("calls to refreshProjects", function() {
      var refreshProjectsSpy = spyOn(loader, 'refreshProjects');
      loader.refresh();
      expect(refreshProjectsSpy).toHaveBeenCalled();
    });

    it("calls to refreshPings", function() {
      var refreshPingsSpy = spyOn(loader, 'refreshPings');
      loader.refresh();
      expect(refreshPingsSpy).toHaveBeenCalled();
    });

    it("calls to checkForDashboardChanges", function() {
      var checkForDashboardChangesSpy = spyOn(loader, 'checkForDashboardChanges');
      loader.refresh();
      expect(checkForDashboardChangesSpy).toHaveBeenCalled();
    });

    it("calls to checkForAwesomeRequest", function() {
      var checkForAwesomeRequestSpy = spyOn(loader, 'checkForAwesomeRequest');
      loader.refresh();
      expect(checkForAwesomeRequestSpy).toHaveBeenCalled();
    });
  });

  describe("#checkForDashboardChanges", function() {
    it("makes a request for the refresh asset", function() {
      var getSpy = spyOn($, 'get');
      loader.checkForDashboardChanges();
      expect(getSpy.mostRecentCall.args[0]).toEqual('refresh.txt');
    });
  });

  describe("#checkForAwesomeRequest", function() {
    it("makes a request for the awesome job asset", function() {
      var getSpy = spyOn($, 'get');
      loader.checkForAwesomeRequest();
      expect(getSpy.mostRecentCall.args[0]).toEqual('awesome.txt');
    });
  });
});