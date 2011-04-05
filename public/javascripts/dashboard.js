function Dashboard(config) {
  return {
    projects: [],
    pings: [],

    applyConfigSettings: function() {
      this.refreshInterval = config.refreshInterval;
      $('#title').text(config.title);
      $('#success').attr('src', config.sounds.success);
      $('#building').attr('src', config.sounds.building);
      $('#failure').attr('src', config.sounds.failure);
    },

    loadPings: function() {
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
        project.render();
        self.projects.push(project);
      });
    },

    getState: function() {
      var state = true;

      $.each(this.projects, function(i, project) {
        if(project.status == 'failure') {
          state = false;
        }
      });

      $.each(this.pings, function(i, ping) {
        if(ping.status == 'failure') {
          state = false;
        }
      });

      return state;
    },

    refreshPings: function() {
      $.each(this.pings, function(i, ping) {
        ping.update();
      });
    },

    refreshProjects: function() {
      $.each(this.projects, function(i, project) {
        project.update();
      });
    },

    refresh: function() {
      this.checkForDashboardChanges();
      this.refreshProjects();
      this.refreshPings();
      this.updateFavicon();
      this.startProgressBarAnimation();
    },

    updateFavicon: function() {
      var image = (this.getState() ? 'images/success.png' : 'images/failure.png');
      $("link[rel=icon]").attr('href', image);
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