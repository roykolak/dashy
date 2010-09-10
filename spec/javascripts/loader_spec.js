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
  
  describe("#refreshPeople", function() {
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
});