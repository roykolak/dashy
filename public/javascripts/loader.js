function Loader(config) {
  return {
    config: config,
    projects: [],
    pings: [],
    refreshInterval: 5000,

    loadPings: function() {
      $('#pings .js_visibility_toggler').visibilityToggler();

      var self = this;
      $.each(config.pings, function(i, v) {
        self.pings.push(new Ping(v));
      });
    },

    loadProjects: function() {
      var self = this;
      $.each(config.projects, function(i, v) {
        self.projects.push(new Project(v));
      });
    },

    refreshPings: function() {
      $.each(this.pings, function(i, ping) {
        $.getJSON(ping.url, function(data) {
          ping.update(data);
        });
      });
    },

    refreshProjects: function() {
      $.each(this.projects, function(i, project) {
        $.getJSON(project.url, function(data) {
          project.update(data);
        });
      });
    },

    refresh: function() {
      this.checkForDashboardChanges();
      this.refreshProjects();
      this.refreshPings();
      this.startProgressBarAnimation();
      this.checkForAwesomeRequest();
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
    },

    checkForAwesomeRequest: function() {
      $.get('awesome.txt', function() {
        Audio.awesome.play();
      });
    }
  }
}