describe('PingView', function() {
  var pingView;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/ping.html');
    var ping = new Ping({name: 'ping name'});
    pingView = new PingView({model: ping});
  });

  describe('#initialize', function() {
    it('defines a tag type', function() {
      expect(pingView.tagName).toEqual('div');
    });

    it('defined a class name', function() {
      expect(pingView.className).toEqual('ping_view');
    });
  });

  describe('#render', function() {
    it('generates the templated html', function() {
      pingView.render();
      console.log(pingView.el);
      expect(pingView.el).not.toBeEmpty();
    });
  });
});
