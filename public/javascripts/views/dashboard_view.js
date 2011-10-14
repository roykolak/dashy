var DashboardView = Backbone.View.extend({
  className: 'dashboard_view',

  render: function() {
    $('#dashboardTemplate').tmpl(this.model.toJSON()).appendTo(this.el);

    var self = this;
    projects.fetch({success: function() { self.renderProjects(); }});
    pings.fetch({success: function() { self.renderPings(); }});

    return this;
  },

  renderProjects: function() {
    var projectsView = new ProjectsView({collection: projects});
    projectsView.bind();
    $(projectsView.render().el).appendTo(this.el);
  },

  renderPings: function() {
    var pingsView = new PingsView({collection: pings});
    pingsView.bind();
    $(pingsView.render().el).appendTo(this.el);
  },

  checkForDashboardChanges: function() {
    $.get('refresh.txt', function() {
      location.reload();
    });
  },

  refresh: function() {
    this.checkForDashboardChanges();
    this.animateProgressBar();
  },

  animateProgressBar: function() {
    $('#progress').animate({ width: '100%' }, this.model.get('refresh') - 1000, 'linear', function() {
      $(this).css('width', 0);
    });
  }
});
