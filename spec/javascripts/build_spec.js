describe("Build", function() {
  var build;
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/builds.html');
    build = new Build({ name:'project build', url:''});
  });
  
  describe("#initialize", function() {
    it("inserts a new build html block", function() {
      expect($('.build, .build .name, .build .time')).toExist();
    });
    
    it("inserts the build name in the header", function() {
      expect($('.build .name')).toHaveText('project build');
    });
  });
  
  describe("#setStatus", function() {
    it("removes 'failure', 'building', and 'success' classes from the project", function() {
      build.setStatus('failure');
      build.setStatus('building');
      build.setStatus('success');
      build.setStatus('status');
      expect($('.build').hasClass('failure building success')).toBeFalsy();
    });
    
    it("adds a 'building' class to a project when it is building", function() {
      build.setStatus('building');
      expect($('.build').hasClass('building')).toBeTruthy();
    });
    
    it("adds a 'success' class to a project when it is successfully built", function() {
      build.setStatus('success');
      expect($('.build').hasClass('success')).toBeTruthy();
    });
    
    it("adds a 'failure' class to a project when it failed to build", function() {
      build.setStatus('failure');
      expect($('.build').hasClass('failure')).toBeTruthy();
    });
    
  });
});