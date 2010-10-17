function Loader(config) {  
  return {
    config: config,
    builds: [],
    refreshInterval: 5000,
    
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
    
    refresh: function() {
      this.refreshBuilds();
      this.startProgressBarAnimation();
    },
    
    startProgressBarAnimation: function() {
      $('#progress').animate({ width: '100%' }, this.refreshInterval - 1000, 'linear', function() {
        $(this).css('width', 0);
      });
    }
  }
}