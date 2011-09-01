describe('ProjectsView', function() {
  var projectsView;

  beforeEach(function() {
    loadFixtures(
      'spec/javascripts/fixtures/projects.html',
      'spec/javascripts/fixtures/project.html'
    );
    var projects = new Projects([
      {name: 'project one'},
      {name: 'project two'}
    ]);
    projectsView = new ProjectsView({collection: projects});
  });

  describe('#initialize', function() {
    it('defines a tag', function() {
      expect(projectsView.tagName).toEqual('ul');
    });

    it('defines a class', function() {
      expect(projectsView.className).toEqual('projects_view');
    });
  });

  describe('#render', function() {
    it('renders all the projects in the collection', function() {
      projectsView.render();
      expect($('.project', projectsView.el).length).toEqual(2);
    });
  });
});
