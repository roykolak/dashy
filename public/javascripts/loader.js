function Loader(config) {  
  return {
    config: config,
    builds: [],
    pings: [],
    refreshInterval: 5000,

    loadPings: function() {
      var self = this;
      $.each(config.pings, function(i, v) {
        self.pings.push(new Ping(v));
      });
    },
    
    loadBuilds: function() {
      var self = this;
      $.each(config.builds, function(i, v) {
        self.builds.push(new Build(v));
      });
    },

    refreshPings: function() {
      $.each(this.pings, function(i, ping) {
        $.getJSON(ping.url, function(data) {
          ping.update(data);
        });
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
      this.checkForDashboardChanges();
      this.refreshBuilds();
      this.refreshPings();
      this.startProgressBarAnimation();
    },
    
    startProgressBarAnimation: function() {
      $('#progress').animate({ width: '100%' }, this.refreshInterval - 1000, 'linear', function() {
        $(this).css('width', 0);
      });
    },
    
    checkForDashboardChanges: function() {
      $.get('refresh.txt', function() {
        location.reload();
      });
    }
  }
}