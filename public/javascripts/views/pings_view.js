var PingsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'pings_view',

  render: function() {
    var self = this;
    $.each(this.collection.models, function(i, ping) {
      var pingView = new PingView({model: ping, el: self.el});
      pingView.render();
    });

    return this;
  }
});
