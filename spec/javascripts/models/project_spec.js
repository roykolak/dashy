describe('Project', function() {
  var project;

  beforeEach(function() {
    project = new Project({name: 'project name'});
  });

  describe('#initialize', function() {
    it('generates the dom id', function() {
      expect(project.get('name')).toEqual('project_name');
    });
  });
});
