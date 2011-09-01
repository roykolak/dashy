var ProjectView = Backbone.View.extend({
  tagName: 'div',
  className: 'project_view',

  render: function() {
    $('#projectTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    return this;
  }
});

