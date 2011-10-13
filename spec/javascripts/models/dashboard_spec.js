describe('Dashboard', function() {
  var dashboard;

  beforeEach(function() {
    dashboard = new Dashboard({name: 'test project'});
  });

  it('exists', function() {
    expect(dashboard).toBeDefined();
  });
});
