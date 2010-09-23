describe("Person", function() {
  var person, 
      twitterName = '@roykolak';
  
  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/people.html');
    person = new Person(twitterName);
  });
  
  describe("initialize", function() {
    it("inserts a new person html block", function() {
      expect($('.person .message, .person .name, .person .image')).toExist();
    });
    
    describe("populated information", function() {
      it("populates the person's name", function() {
        expect($('.person .name')).toHaveText(twitterName);
      });
      
      it("sets the mood image to happy", function() {
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
      });
      
      it("sets the current mood to happy", function() {
        expect(person.mood).toEqual('happy');
      });
    });
  });
  
  describe("#madeAnnouncement", function() {
    it("removes announced class from all persons and adds it to the person who made the new announcement", function() {
      person.madeAnnouncement();
      expect($('.person')).toHaveClass('announced');
    });
  });
  
  describe("#setMessage", function() {
    it("updates the user's message", function() {
      var message = 'running late, start w/o me!';
      person.setMessage(message);
      expect($('.person .message')).toHaveText(message);
    });
  });
  
  describe("#setMood", function() {
    describe("default mood", function() {
      it("sets image to happy.png when passed an empty tag", function() {
        person.setMood([]);
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
      });
      
      it("sets image to happy.png when passed an unrecognizable tag", function() {
        person.setMood(['fake']);
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
      });
    });
    
    describe("toggling to angry", function() {
      beforeEach(function() {
        person.setMood(['angry']);
      });
      
      it("sets image to angry.png", function() {
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/angry.png');
      });
    
      it("sets mood property to angry", function() {
        expect(person.mood).toEqual('angry');
      });

      it("removes a class of 'success' on the person wrapper", function() {
        expect($('.person').hasClass('success')).toBeFalsy();
      });
      
      it("adds a class of 'failure' on the person wrapper", function() {
        expect($('.person').hasClass('failure')).toBeTruthy();
      });
    });
    
    describe("toggling to happy", function() {
      beforeEach(function() {
        person.setMood(['happy']);
      });
      
      it("sets image to happy.png", function() {
        expect($('.person .image')).toHaveAttr('src', 'images/smileys/happy.png');
      });

      it("sets mood property to happy", function() {
        expect(person.mood).toEqual('happy');
      });
      
      it("removes a class of 'failure' on the person wrapper", function() {
        expect($('.person').hasClass('failure')).toBeFalsy();
      });
      
      it("adds a class of 'success' on the person wrapper", function() {
        expect($('.person').hasClass('success')).toBeTruthy();
      });
    });
    
    describe("when no mood is specified", function() {
      beforeEach(function() {
        person.setMood(['angry']);
        person.setMood(['announce']);
      });
      
      it("keeps the previously specified mood", function() {
        expect(person.mood).toEqual('angry');
      });
    });

    describe("mood change noises", function() {
      var peopleAudioSpy;
      
      beforeEach(function() {
        person.setMood(['happy']);
        peopleAudioSpy = spyOn(Audio.moodChange, 'play');
      });
      
      it("plays a noise when someone's mood changes", function() {
        person.setMood(['angry']);
        expect(peopleAudioSpy).toHaveBeenCalled();
      });
      
      it("does not play a noise if a person's mood does not change", function() {
        person.setMood(['happy']);
        expect(peopleAudioSpy).not.toHaveBeenCalled();
      });
    });
  });
});