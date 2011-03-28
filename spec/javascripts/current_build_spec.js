describe("CurrentBuild", function() {
  var currentBuild, options;

  beforeEach(function() {
    loadFixtures('spec/javascripts/fixtures/project.html');
    currentBuild = new CurrentBuild('#project_name', 'project name');
  });

  describe("#buildAndInsertElements", function() {
    beforeEach(function() {
      currentBuild.buildAndInsertElements();
    });

    it("inserts a new project html block", function() {
      expect($('.project .current_build .name, .project .current_build .time, .project .current_build .message')).toExist();
    });

    it("inserts the build name in the header", function() {
      expect($('.project .current_build .name')).toHaveText('project name');
    });
  });

  describe("#setStatus", function() {
    beforeEach(function() {
      currentBuild.buildAndInsertElements();
    });

    it("removes 'failure', 'building', and 'success' classes from the project", function() {
      currentBuild.setStatus('failure');
      currentBuild.setStatus('building');
      currentBuild.setStatus('success');
      currentBuild.setStatus('status');
      expect($('.current_build').hasClass('failure building success')).toBeFalsy();
    });

    it("adds the status as a class to a project", function() {
      currentBuild.setStatus('building');
      expect($('.current_build').hasClass('building')).toBeTruthy();
    });
  });

  describe("#setDuration", function() {
    beforeEach(function() {
      currentBuild.buildAndInsertElements();
    });

    it("inserts the passed time into the time div and appends time label", function() {
      currentBuild.setDuration(5000);
      expect($('.current_build .time')).toHaveText('5 sec');
    });

    it("empties the time container if passed zero", function() {
      currentBuild.setDuration(0);
      expect($('.current_build .time')).toHaveText('');
    });
  });

  describe("#setCommitMessage", function() {
    var commitMessage = "This is the commit message";

    beforeEach(function() {
      currentBuild.buildAndInsertElements();
    });

    it("inserts the passed commit message into the commit message div", function() {
      currentBuild.setCommitMessage(commitMessage);
      expect($('.current_build .message')).toHaveText(commitMessage)
    });
  });
});