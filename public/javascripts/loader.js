function Loader(config) {
  
  return {
    config:config,
    people: [],
    builds: [],
    
    loadBuilds: function() {
      var self = this;
      $.each(config.builds, function(i, v) {
        self.builds.push(new Build(v));
      });
    },
    
    refreshBuilds: function() {
      $.each(this.builds, function(i, build) {
        $.getJSON(build.url, function(data) {
          build.update(data);
        });
      });
    },
    
    loadPeople: function() {
      var self = this;
      $.each(config.people, function(i, v) {
        self.people.push(new Person(v));
      });
    },
    
    refreshPeople: function() {
      var self = this;
      $.each(config.people, function(index) {
        var url = 'http://api.twitter.com/1/users/show.json?screen_name=' + this + '&callback=?';
        $.getJSON(url, function(data) {
          
          // REFACTOR: Too much here.
          var person = self.people[index],
              status = new TwitterStatus(data.status.text).parse();
              
          person.setMessage(status.message);
          person.setMood(status.tags);

          if($.inArray('announce', status.tags) != -1) {
            if($('#announce h1').text() != status.message) {
              Audio.newAnnouncement.play();
              person.madeAnnouncement();
            }

            $('#announce h1').text(status.message);
          } else {
            $('#announce h1');
          }
        });
      });
    }
  }
}