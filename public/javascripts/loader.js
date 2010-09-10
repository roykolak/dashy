function Loader(config) {
  
  return {
    config:config,
    people: [],
    
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
          self.refreshPersonCallback(data.status.text, self.people[index]);
        });
      });
    },
    
    refreshPersonCallback: function(status, person) {
      var status = new TwitterStatus(status).parse();
      person.setMessage(status.message);
      person.setMood(status.tags);
    }
  }
}