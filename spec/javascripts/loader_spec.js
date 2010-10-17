describe("Loader", function() {
  var config, loader;
  
  beforeEach(function() {
    config = {
      builds: [{ name:'Sweet Project', url:'http://www.buildresults.com/project'}]
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
  
  describe("#loadbuilds", function() {
    var buildSpy;
    
    beforeEach(function() {
      buildSpy = spyOn(window, 'Build');
      loader.loadBuilds();
    });
    
    it("initializes builds", function() {
      expect(buildSpy).toHaveBeenCalledWith(config.builds[0]);
    });
    
    it("stores the initialized builds", function() {
      expect(loader.builds.length).toBe(1);
    });
  });
  
  describe("#refreshBuilds", function() {
    var data, getJSONSpy;
    
    beforeEach(function() {
      data = { result: 'SUCCESS' };
      getJSONSpy = spyOn($, 'getJSON');
      loader.loadBuilds();
      loader.refreshBuilds();
    });
    
    it("makes a request to the build server using the stored url for the project", function() {
      expect(getJSONSpy.mostRecentCall.args[0]).toEqual(config.builds[0].url + '?jsonp=?');
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
    
    it("calls to refreshBuilds", function() {
      var refreshBuildsSpy = spyOn(loader, 'refreshBuilds');
      loader.refresh();
      expect(refreshBuildsSpy).toHaveBeenCalled();
    });
    
    it("calls to checkForDashboardChanges", function() {
      var checkForDashboardChangesSpy = spyOn(loader, 'checkForDashboardChanges');
      loader.refresh();
      expect(checkForDashboardChangesSpy).toHaveBeenCalled();
    });
  });
  
  describe("#checkForDashboardChanges", function() {
    it("makes a request for the refresh asset", function() {
      var getSpy = spyOn($, 'get');
      loader.checkForDashboardChanges();
      expect(getSpy.mostRecentCall.args[0]).toEqual('refresh.txt');
    });
  });
});