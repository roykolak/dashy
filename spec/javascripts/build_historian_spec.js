describe("BuildHistorian", function() {
  var buildHistorian;
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/build_history.html');
    buildHistorian = new BuildHistorian($('.project'));
  });
  
  describe("#initialize", function() {
    it("stores the build element", function() {
      expect(buildHistorian.buildElement).toEqual($('.project'));
    });
    
    it("inserts a build history list", function() {
      expect($('.project .history')).toExist();
    });
  });
  
  describe("#addStatus", function() {
    beforeEach(function() {
      buildHistorian.addStatus('success');
    });
    
    it("prepends a new build status to the history", function() {
      expect($('.project .history li')).toExist();
    });
    
    it("adds a class of 'status' to the prepended status element", function() {
      expect($('.project .history .status')).toExist();
    });
    
    it("adds the passed status as a class of the prepended status element", function() {
      expect($('.project .history .success')).toExist();
    });
    
    it("adds the passed status as the text of the prepended status element", function() {
      expect($('.project .history .success')).toHaveText('success');
    });
    
    describe("when there are ten previous build status", function() {
      beforeEach(function() {
        for(var times = 11; times > 0; times--) {
          buildHistorian.addStatus('success');
        }
      });
      
      it("removes the oldest status and prepends the new status", function() {
        expect($('.project .history li').length).toEqual(buildHistorian.maxStatuses);
        buildHistorian.addStatus('success');        
        expect($('.project .history li').length).toEqual(buildHistorian.maxStatuses);
      });
    });
  });
});