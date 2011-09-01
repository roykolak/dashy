describe('ProjectView', function() {
  var projectView;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/project.html');
    var project = new Project({name: 'project name'});
    projectView = new ProjectView({model: project});
  });

  describe('#initialize', function() {
    it('defines the tag', function() {
      expect(projectView.tagName).toEqual('div');
    });

    it('defines the class name', function() {
      expect(projectView.className).toEqual('project_view');
    });
  });

  describe('#render', function() {
    it('generates the html', function() {
      projectView.render();
      console.log(projectView.el);
      expect(projectView.el).not.toBeEmpty();
    });
  });
});
