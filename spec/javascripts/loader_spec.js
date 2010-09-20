describe("Loader", function() {
  var config, loader;
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/people.html');
    config = { 
      people: ['@roykolak'],
      builds: ['Sweet Project']
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
      expect(buildSpy).toHaveBeenCalledWith('Sweet Project');
    });
    
    it("stores the initialized builds", function() {
      expect(loader.builds.length).toBe(1);
    });
  });
  
  describe("#loadPeople", function() {
    var personSpy;
    
    beforeEach(function() {
      personSpy = spyOn(window, 'Person');
      loader.loadPeople();
    });
    
    it("initializes people", function() {
      expect(personSpy).toHaveBeenCalledWith('@roykolak');
    });
    
    it("stores the initialized people", function() {
      expect(loader.people.length).toBe(1);
    });
  });
  
  describe("#refreshPeople", function() {
    var data, getJSONSpy;
    
    beforeEach(function() {
      data = { status: { text: 'this is the message buddy #happy' } };
      
      getJSONSpy = spyOn($, 'getJSON').andCallFake(function() {
        loader.refreshPersonCallback(data.status.text, loader.people[0]);
      });
      
      loader.loadPeople();
    });
    
    it("makes a request to twitter using the person's twitter name", function() {
      loader.refreshPeople();
      expect(getJSONSpy.mostRecentCall.args[0]).toEqual('http://api.twitter.com/1/users/show.json?screen_name=@roykolak&callback=?');
    });
    
    it("calls to refreshPersonCallback after the request is made", function() {
      var callbackSpy = spyOn(loader, 'refreshPersonCallback');
      loader.refreshPeople();
      expect(callbackSpy).toHaveBeenCalledWith(data.status.text, loader.people[0]);
    });
  });
  
  describe("#refreshPersonCallback", function() {
    var newAnnouncementAudioSpy, personSpy;
    
    beforeEach(function() {
      newAnnouncementAudioSpy = spyOn(Audio.newAnnouncement, 'play');
      loader.loadPeople();
      personSpy = spyOn(loader.people[0], 'madeAnnouncement');
    });
    
    describe("announcements", function() {
      beforeEach(function() {
        loadFixtures('spec/javascripts/fixtures/announce.html');
        loader.refreshPersonCallback('Just when I thought I was out, they pull me back in #announce', loader.people[0]);
      });
      
      it("inserts the message into the announcement header when the announce tag is present", function() {
        expect($('#announce h1')).toHaveText('Just when I thought I was out, they pull me back in');
      });
      
      it("plays a noise when there's a new announcement", function() {
        expect(newAnnouncementAudioSpy).toHaveBeenCalled();
      });
      
      it("marks the person who made the announcement", function() {
        expect(personSpy).toHaveBeenCalled();
      });
    });

    
    describe("updating person data", function() {
      beforeEach(function() {
        loader.refreshPersonCallback('this is the message buddy #happy', loader.people[0]);
      });
      
      it("updates the person's message", function() {
        expect($('.person .message')).toHaveText('this is the message buddy');
      });
    
      it("updates the person's mood", function() {
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
      });      
    });
  });
});