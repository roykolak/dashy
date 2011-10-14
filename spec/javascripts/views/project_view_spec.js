describe('ProjectView', function() {
  var projectView, project;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/project.html');
    project = new Project({
      name: 'project name',
      email: 'roy.kolak@gmail.com',
      status: 'success',
      time: '100',
      message: 'commit message'
    });
    projectView = new ProjectView({model: project});
  });

  describe('#initialize', function() {
    it('defines the class name', function() {
      expect(projectView.className).toEqual('project_view');
    });
  });

  describe('#render', function() {
    it('inserts the name', function() {
      projectView.render();
      expect($('.name', projectView.el)).toHaveText(project.get('name'));
    });

    it('inserts the message', function() {
      projectView.render();
      expect($('.message', projectView.el)).toHaveText(project.get('message'));
    });

    it('inserts the gravatar url', function() {
      projectView.render();
      expect($('.gravatar', projectView.el).attr('src')).toEqual(project.get('gravatarUrl'));
    });

    it('inserts the time', function() {
      projectView.render();
      expect($('.time', projectView.el)).toHaveText(project.get('time'));
    });

    it('inserts the status', function() {
      projectView.render();
      expect($('.status.success', projectView.el)).toExist();
    });
  });
});
