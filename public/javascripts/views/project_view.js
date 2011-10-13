var ProjectView = Backbone.View.extend({
  className: 'project_view',

  render: function() {
    $('#projectTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    return this;
  }
});

