describe("Build", function() {
  var build, options;
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/builds.html');
    options = { name:'project build', url:'http://www.buildstatus.com', sound:true }
    build = new Build(options);
  });
  
  describe("#initialize", function() {
    it("inserts a new build html block", function() {
      expect($('.build, .build .name, .build .time')).toExist();
    });
    
    it("inserts the build name in the header", function() {
      expect($('.build .name')).toHaveText('project build');
    });
    
    it("stores the url and append jsonp", function() {
      expect(build.url).toEqual('http://www.buildstatus.com?jsonp=?');
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
    
    it("sets the previous build status w/ the passed build status", function() {
      build.setStatus('success');
      expect(build.previousBuild).toEqual('success');
    });

    describe("sounds", function() {
      var successAudioSpy;
      
      beforeEach(function() {
        successAudioSpy = spyOn(Audio.success, 'play');
      });
      describe("when the sound option is set to false", function() {
        beforeEach(function() {
          options.sound = false
          build = new Build(options);
        });
        
        it("does not play a sound if the sound option is set to false", function() {
          build.setStatus('failure');
          build.setStatus('success');
          expect(successAudioSpy).not.toHaveBeenCalled();        
        });        
      });
      
      describe("when the sound option is true", function() {
        it("plays the success sound when the status is 'success' and the previous status was not success", function() {  
          build.setStatus('failure');
          build.setStatus('success');
          expect(successAudioSpy).toHaveBeenCalled();
        });
      
        it("does not play the success sound when the status is not 'success'", function() {
          build.setStatus('failure');
          expect(successAudioSpy).not.toHaveBeenCalled();
        });        
      });

    });
  });
  
  describe("#setDuration", function() {
    it("inserts the passed time into the time div and appends time label", function() {
      build.setDuration(5);
      expect($('.build .time')).toHaveText('5 sec');
    });
    
    it("empties the time container if passed zero", function() {
      build.setDuration(0);
      expect($('.build .time')).toHaveText('');
    });
  });
  
  describe("#update", function() {
    var setStatusSpy, setDurationSpy;
    
    beforeEach(function() {
      setStatusSpy = spyOn(build, 'setStatus');
      setDurationSpy = spyOn(build, 'setDuration');
    });
    
    it("sets the status of the build to building when it is building", function() {
      build.update({ building:true });
      expect(setStatusSpy).toHaveBeenCalledWith('building');
    });
    
    it("sets the status of the build to success when it has successfuly built", function() {
      build.update({ building:false, result:'SUCCESS' });
      expect(setStatusSpy).toHaveBeenCalledWith('success');
    });
    
    it("sets the status of the build to failure when it has failed being built", function() {
      build.update({ building:false, result:'FAILURE' });
      expect(setStatusSpy).toHaveBeenCalledWith('failure');
    });
    
    it("converts the duration to seconds and calls setDuration w/ the value", function() {
      build.update({ building:false, result:'FAILURE', duration:'5432' });
      expect(setDurationSpy).toHaveBeenCalledWith(5);
    });
  });
});