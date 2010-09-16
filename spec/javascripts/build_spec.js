describe("Build", function() {
  var build;
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/builds.html');
    build = new Build('project build');
  });
  
  describe("#initialize", function() {
    it("inserts a new build html block", function() {
      expect($('.build, .build .name, .build .time')).toExist();
    });
    
    it("inserts the build name in the header", function() {
      expect($('.build .name')).toHaveText('project build');
    });
  });
});