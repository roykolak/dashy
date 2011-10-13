var ProjectsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'projects_view',

  bind: function() {
    this.collection.bind('error', this.errorLoading, this);
  },

  errorLoading: function() {
    $(this.el).text('error loading projects');
  },

  render: function() {
    var self = this;
    $.each(this.collection.models, function(i, project) {
      var projectView = new ProjectView({model: project, el: self.el});
      projectView.render();
    });

    return this;
  }
});
