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
      expect($('.history')).toExist();
    });
  });
  
  describe("#buildStateElement", function() {
    var stateElement;
    
    beforeEach(function() {
      stateElement = buildHistorian.buildStateElement();
    });

    it("creates an li", function() {
      expect($(stateElement).is('li')).toBeTruthy();
    });
    
    it("adds a class of status to the element", function() {
      expect($(stateElement).hasClass('status')).toBeTruthy();
    });
  });
  
  describe("removeOldestBuildResult", function() {
    beforeEach(function() {
      buildHistorian.addState('success');
    });
    
    it("drops the oldest build state", function() {
      expect($('.status').length).toEqual(1);
      buildHistorian.removeOldestBuildState();
      expect($('.status').length).toEqual(0);
    });
  });
  
  describe("#addState", function() {
    beforeEach(function() {
      buildHistorian.addState('success');
    });
    
    it("adds the passed state as a class on the state element", function() {
      expect($('.status').hasClass('success')).toBeTruthy();
    });
    
    it("prepends a new state element", function() {
      expect($('.status').length).toEqual(1)
    });
    
    describe("when there are 10 previous build states", function() {
      beforeEach(function() {
        for(var times = 11; times > 0; times--) {
          buildHistorian.addState('success');
        }
      });
      
      it("removes the oldest state and prepends the new state", function() {
        expect($('.project .history li').length).toEqual(buildHistorian.maxStates);
        buildHistorian.addState('success');
        expect($('.project .history li').length).toEqual(buildHistorian.maxStates);
      });
    });
  });
});