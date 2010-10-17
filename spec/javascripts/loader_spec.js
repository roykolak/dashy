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
});