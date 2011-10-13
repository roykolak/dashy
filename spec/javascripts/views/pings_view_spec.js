describe('PingsView', function() {
  var pingsView;

  beforeEach(function() {
    loadFixtures(
      'spec/javascripts/fixtures/pings.html',
      'spec/javascripts/fixtures/ping.html'
    );
    var pings = new Pings([
      {name: 'ping one'},
      {name: 'ping two'}
    ]);
    pingsView = new PingsView({collection: pings});
  });

  describe('#initialize', function() {
    it('defines a tag', function() {
      expect(pingsView.tagName).toEqual('ul');
    });

    it('defines a class', function() {
      expect(pingsView.className).toEqual('pings_view');
    });
  });

  describe('#render', function() {
    it('renders all the pings in the collection', function() {
      pingsView.render();
      expect($('.ping', pingsView.el).length).toEqual(2);
    });
  });
});
