describe('ProjectsView', function() {
  var projectsView, projects;

  beforeEach(function() {
    loadFixtures(
      'spec/javascripts/fixtures/projects.html',
      'spec/javascripts/fixtures/project.html'
    );
    projects = new Projects([
      {name: 'project one', email: 'roy.kolak@gmail.com'},
      {name: 'project two', email: 'roy.kolak@gmail.com'}
    ]);
    projectsView = new ProjectsView({collection: projects});
  });

  it('defines a tag', function() {
    expect(projectsView.tagName).toEqual('ul');
  });

  it('defines a class', function() {
    expect(projectsView.className).toEqual('projects_view');
  });

  describe('#bind', function() {
    it('binds to error on the collection', function() {
      spyOn(projects, 'bind');
      projectsView.bind();
      expect(projects.bind).toHaveBeenCalledWith('error', projectsView.errorLoading, projectsView);
    });
  });

  describe('#errorLoading', function() {
    it('inserts an error message into the title', function() {
      projectsView.errorLoading();
      expect($(projectsView.el)).toHaveText('error loading projects');
    });
  });

  describe('#render', function() {
    it('renders all the projects in the collection', function() {
      projectsView.render();
      expect($('.project_view', projectsView.el).length).toEqual(2);
    });
  });
});
