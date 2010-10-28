describe("Ping", function() {
  var ping,
      config = { name:'server', url:'http://builder.com' };
      
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/pings.html');
    ping = new Ping(config);
  });
      
  describe("#initialize", function() {
    it("stores the name", function() {
      expect(ping.name).toEqual(config.name);
    });
    
    it("stores the url and append jsonp", function() {
      expect(ping.url).toEqual(config.url + '?jsonp=?');
    });
    
    it("inserts a new ping html block", function() {
      expect($('.ping .current_build, .ping .status')).toExist();
    });
    
    it("inserts the build name in the header", function() {
      expect($('.ping .name')).toHaveText(config.name);
    });
  });
  
  describe("#setStatus", function() {
    it("removes 'building', and 'success' classes from the project", function() {
      ping.setStatus('failure');
      ping.setStatus('success');
      ping.setStatus('status');
      expect($('.current_build').hasClass('building success')).toBeFalsy();
    });
    
    it("adds a 'success' class to a project when it is successfully built", function() {
      ping.setStatus('success');
      expect($('.current_build').hasClass('success')).toBeTruthy();
    });
    
    it("adds a 'failure' class to a project when it failed to build", function() {
      ping.setStatus('failure');
      expect($('.current_build').hasClass('failure')).toBeTruthy();
    });
    
    it("sets the previous build status w/ the passed build status", function() {
      ping.setStatus('success');
      expect(ping.previousBuild).toEqual('success');
    });
    
    it("blinks a few times when a new status is set", function() {
      var twinkleSpy = spyOn($.fn, 'twinkle');

      ping.setStatus('failure');
      ping.setStatus('success');

      expect(twinkleSpy).toHaveBeenCalled();
    });
    
    describe("sounds", function() {      
      describe("the failure sound", function() {
        var failureAudioSpy;
        
        beforeEach(function() {
          failureAudioSpy = spyOn(Audio.failure, "play");
        });
        
        it("plays the failure sound when the status is 'failure' and the previous status was not failure", function() {
          ping.setStatus('success');
          ping.setStatus('failure');
          expect(failureAudioSpy).toHaveBeenCalled();
        });
      });
    });
  });
});