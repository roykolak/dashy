describe('Pings', function() {
  var pings;

  beforeEach(function() {
    pings = new Pings();
  });

  it('is a collection of Pings', function() {
    expect(pings.model).toEqual(Ping);
  });
});
