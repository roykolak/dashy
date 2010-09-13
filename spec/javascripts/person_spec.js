describe("Person", function() {
  var person, 
      twitterName = '@roykolak';
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/people.html');
    person = new Person(twitterName);
  });
  
  describe("#initialize", function() {
    it("inserts a new person html block", function() {
      expect($('.person .message, .person .name, .person .image')).toExist();
    });
    
    describe("populated information", function() {
      it("populates the person's name", function() {
        expect($('.person .name')).toHaveText(twitterName);
      });
      
      it("populates the default smiley", function() {
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/default.png');
      });
    });
  });
  
  describe("#updateMessage", function() {
    it("updates the user's message", function() {
      var message = 'running late, start w/o me!';
      person.setMessage(message);
      expect($('.person .message')).toHaveText(message);
    });
  });
  
  describe("#setMood", function() {
    it("sets image to happy.png when passed '#happy'", function() {
      person.setMood(['#happy']);
      expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
    });
    
    it("sets image to angry.png when passed '#angry'", function() {
      person.setMood(['#angry']);
      expect($('.person .image')).toHaveAttr('src', 'images/smileys/angry.png');
    });
    
    describe("default mood", function() {
      it("sets image to happy.png when passed an empty tag", function() {
        person.setMood([]);
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
      });
      
      it("sets image to happy.png when passed an unrecognizable tag", function() {
        person.setMood(['#fake']);
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
      });      
    });

  });
});