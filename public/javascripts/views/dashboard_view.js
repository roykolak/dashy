var DashboardView = Backbone.View.extend({
  className: 'dashboard_view',

  render: function() {
    $('#dashboardTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    this.renderProjects();
    this.renderPings();
    return this;
  },

  renderProjects: function() {
    this.projectsView = new ProjectsView({collection: projects});
    this.projectsView.bind();
    $(this.projectsView.render().el).appendTo(this.el);
  },

  renderPings: function() {
    this.pingsView = new PingsView({collection: pings});
    this.pingsView.bind();
    $(this.pingsView.render().el).appendTo(this.el);
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
