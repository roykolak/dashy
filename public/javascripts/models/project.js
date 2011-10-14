Project = Backbone.Model.extend({
  initialize: function() {
    this.set({domId: this.get('name').replace(/ /g, '_')});
    this.set({gravatarUrl: Gravatar.url(this.get('email'))});
  }
});
