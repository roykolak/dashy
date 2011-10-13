var ProjectsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'projects_view',

  render: function() {
    var self = this;
    $.each(this.collection.models, function(i, project) {
      var projectView = new ProjectView({model: project, el: self.el});
      projectView.render();
    });

    return this;
  }
});
