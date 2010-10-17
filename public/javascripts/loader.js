function Loader(config) {
  
  return {
    config:config,
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
    }
  }
}