var ProjectsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'projects_view',

  render: function() {
    $('#projectsTemplate').tmpl().appendTo(this.el);

    var self = this;
    $.each(this.collection.models, function(i, project) {
      var projectView = new ProjectView({model: project});
      $(projectView.render().el).appendTo(self.el);
    });

    return this;
  }
});
