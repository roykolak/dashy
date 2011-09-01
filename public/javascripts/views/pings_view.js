var PingsView = Backbone.View.extend({
  tagName: 'div',
  className: 'pings_view',

  render: function() {
    $('#pingsTemplate').tmpl().appendTo(this.el);

    var self = this;
    $.each(this.collection.models, function(i, ping) {
      var pingView = new PingView({model: ping});
      $(pingView.render().el).appendTo(self.el);
    });

    return this;
  }
});
