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
    it("initializes people", function() {
      var personSpy = spyOn(window, 'Person');
      var loader = new Loader(config);
      loader.loadPeople();
      expect(personSpy).toHaveBeenCalledWith('@roykolak');
    });
  });
  
  xdescribe("#refreshPeople", function() {
    it("updates the person's information", function() {
      var data = { status: { text: 'this is the message buddy #happy' } };
      
      spyOn($, 'getJSON').andCallFake(function() {
        loader.refreshPersonCallback(data.status.text, loader.people[0]);
      });

      loader.loadPeople();
      loader.refreshPeople();

      expect($('.person .message')).toHaveText('this is the message buddy');
      expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
    });

  });
  
  describe("#refreshPersonCallback", function() {
    beforeEach(function() {
      loader.loadPeople();
    });
    
    it("inserts the message into the announcement header when the announce tag is present", function() {
      loadFixtures('spec/javascripts/fixtures/announce.html');
      loader.refreshPersonCallback('Just when I thought I was out, they pull me back in #announce', loader.people[0]);
      expect($('#announce')).toHaveText('Just when I thought I was out, they pull me back in');
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