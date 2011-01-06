function Loader(config) {
  $('#title').text(config.title);

  return {
    config: config,
    projects: [],
    pings: [],
    refreshInterval: 5000,

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
        project.buildAndInsertElements();
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