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
        var ping = new Ping(v);
        ping.buildAndInsertElements();
        self.pings.push(ping);
      });
    },

    loadProjects: function() {
      var self = this;
      $.each(config.projects, function(i, v) {
        var project = new Project(v);
        project.buildAndInsertElements();
        self.projects.push(project);
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