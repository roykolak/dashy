Ping = Backbone.Model.extend({
  initialize: function() {
    this.set({domId: this.get('name').replace(/ /g,"_")});
  }
});
