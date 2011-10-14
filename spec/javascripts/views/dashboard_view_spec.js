describe('DashboardView', function() {
  var dashboardView, dashboard;

  beforeEach(function() {
    loadFixtures(
      'spec/javascripts/fixtures/dashboard.html',
      'spec/javascripts/fixtures/projects.html',
      'spec/javascripts/fixtures/project.html',
      'spec/javascripts/fixtures/pings.html',
      'spec/javascripts/fixtures/ping.html'
    );

    dashboard = new Dashboard({title: 'dashy!', refresh: 5000});
    projects = new Projects();
    pings = new Pings();

    spyOn(projects, 'fetch').andCallFake(function(options) {
      options.success();
    });
    spyOn(pings, 'fetch').andCallFake(function(options) {
      options.success();
    });

    dashboardView = new DashboardView({model: dashboard});
  });

  it('defined a class', function() {
    expect(dashboardView.className).toEqual('dashboard_view');
  });

  describe('#render', function() {
    it('inserts the title', function() {
      dashboardView.render();
      expect($('.title', dashboardView.el)).toHaveText(dashboard.get('title'));
    });

    it('renders the projects', function() {
      dashboardView.render();
      expect($('.projects_view', dashboardView.el)).toExist();
    });

    it('renders the pings', function() {
      dashboardView.render();
      expect($('.pings_view', dashboardView.el)).toExist();
    });

    it('returns the instance', function() {
      expect(dashboardView.render()).toEqual(dashboardView);
    });
  });

  describe('#refresh', function() {
    it('animates the progress bar', function() {
      spyOn($.fn, 'animate');
      dashboardView.refresh();
      expect($.fn.animate).toHaveBeenCalledWith({width: '100%'}, 4000, 'linear', jasmine.any(Function));
    });

    it('checks for refresh.txt', function() {
      spyOn($, 'get');
      dashboardView.checkForDashboardChanges();
      expect($.get).toHaveBeenCalledWith('refresh.txt', jasmine.any(Function));
    });
  });
});
