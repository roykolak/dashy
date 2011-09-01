describe('DashboardView', function() {
  var dashboardView;

  beforeEach(function() {
    loadFixtures(
      'spec/javascripts/fixtures/dashboard.html',
      'spec/javascripts/fixtures/projects.html',
      'spec/javascripts/fixtures/project.html',
      'spec/javascripts/fixtures/pings.html',
      'spec/javascripts/fixtures/ping.html'
    );
    dashboardView = new DashboardView();
    projects = new Projects([{name: 'project one'}, {name: 'project two'}]);
    pings = new Pings([{name: 'project one'}, {name: 'project two'}]);
  });

  describe('#initialize', function() {
    it('defines a tag', function() {
      expect(dashboardView.tagName).toEqual('div');
    });

    it('defined a class', function() {
      expect(dashboardView.className).toEqual('dashboard_view');
    });
  });

  describe('#render', function() {
    it('renders the projects', function() {
      dashboardView.render();
      expect($('.projects', dashboardView.el).length).toEqual(1);
    });

    it('renders the pings', function() {
      dashboardView.render();
      expect($('.pings', dashboardView.el).length).toEqual(1);
    });
  });
});
