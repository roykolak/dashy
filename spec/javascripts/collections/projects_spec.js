describe('Projects', function() {
  var projects;

  beforeEach(function() {
    projects = new Projects();
  });

  it('is a collection of Projects', function() {
    expect(projects.model).toEqual(Project);
  });
});
