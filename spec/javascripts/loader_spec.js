describe("Loader", function() {
  var config, loader;
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/people.html');
    config = { 
      people: ['@roykolak']
    };
    loader = new Loader(config);
  });
  
  describe("#initialize", function() {
    it("stores the passed config options", function() {
      expect(loader.config).toEqual(config);
    });
  });
  
  describe("#loadPeople", function() {
    var personSpy;
    
    beforeEach(function() {
      personSpy = spyOn(window, 'Person');
      var loader = new Loader(config);
      loader.loadPeople();
    });
    
    it("initializes people", function() {
      expect(personSpy).toHaveBeenCalledWith('@roykolak');
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
    beforeEach(function() {
      loader.loadPeople();
    });
    
    describe("announcements", function() {
      beforeEach(function() {
        loadFixtures('spec/javascripts/fixtures/announce.html');
      });
      
      it("inserts the message into the announcement header when the announce tag is present", function() {
        loader.refreshPersonCallback('Just when I thought I was out, they pull me back in #announce', loader.people[0]);
        expect($('#announce')).toHaveText('Just when I thought I was out, they pull me back in');
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