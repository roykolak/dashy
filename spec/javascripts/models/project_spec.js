describe('Project', function() {
  var project;

  beforeEach(function() {
    project = new Project({name: 'project name', email: 'roy.kolak@gmail.com'});
  });

  describe('#initialize', function() {
    it('generates the dom id', function() {
      expect(project.get('domId')).toEqual('project_name');
    });

    it('sets the gravatar url', function() {
      expect(project.get('gravatarUrl')).toBeDefined();
    });
  });
});
