function itBehavesLikeACommitMessageParser(context) {
  describe("commit messages", function() {
    var statusParser, response;

    beforeEach(function() {
      statusParser = context.parser;
      response = context.response;
    });

    describe("when a commit message is available", function() {
      it("returns the commit message", function() {
        var result = statusParser.parse(response.singleCommit);
        expect(result.commitMessage).toEqual("This is the only commit message");
      });
    });
    
    describe("when many commits are being built", function() {
      it("returns the most recent commit message", function() {
        var result = statusParser.parse(response.multipleCommits);
        expect(result.commitMessage).toEqual("This is the most recent commit message");
      });
    });

    describe("when a commit message is not available", function() {
      it("returns a sad message", function() {
        var result = statusParser.parse(response.noCommitMessage);
        expect(result.commitMessage).toEqual(statusParser.noCommitMessageSubstitute);
      });
    });
  });
}

function itBehavesLikeABuildStateParser(context) {
  describe("build states", function() {
    var statusParser, response;

    beforeEach(function() {
      statusParser = context.parser;
      response = context.response;
    });

    describe("when the build was 'success'", function() {
      it("returns 'success' as the status", function() {
        var result = statusParser.parse(response.successBuild);
        expect(result.status).toEqual('success');
      });
    });

    describe("when the build was a 'failure'", function() {
      it("returns 'failure' as the status", function() {
        var result = statusParser.parse(response.failureBuild);
        expect(result.status).toEqual('failure');
      });
    });

    describe("when the build is 'building'", function() {
      it("returns 'building' as the status", function() {
        var result = statusParser.parse(response.buildingBuild);
        expect(result.status).toEqual('building');
      });
    });
  });
}

function itBehavesLikeADurationParser(context) {
  describe("durations", function() {
    var statusParser, response;

    beforeEach(function() {
      statusParser = context.parser;
      response = context.response;
    });

    describe("when the build is 'building'", function() {
      it("returns a duration of zero", function() {
        var result = statusParser.parse(response.buildingBuild);
        expect(result.duration).toEqual(0);
      });
    });

    describe("when the build is not building", function() {
      it("returns the duration value", function() {
        var result = statusParser.parse(response.failureBuild); 
        expect(result.duration).toEqual(50000);
      }); 
    });
  });
}


describe("StatusParser", function() {
  describe("#initialize", function() {
    it("stores the ci name", function() {
      var ci = 'Hudson',
          statusParser = new StatusParser(ci);      
      expect(statusParser.ci).toEqual(ci);
    });
  });

  describe("#parse", function() {
    describe("Hudson parsing", function() {
      var statusParser, context = {}; 

      beforeEach(function() {
        statusParser = new StatusParser('Hudson');
        context.parser = statusParser;
        context.response = HudsonResponse;
      });

      itBehavesLikeACommitMessageParser(context);
      itBehavesLikeABuildStateParser(context);
      itBehavesLikeADurationParser(context);
    });

    describe("Custom parsing", function() {
      var statusParser, context = {};

      beforeEach(function() {
        statusParser = new StatusParser('Custom');
        context.parser = statusParser;
        context.response = CustomResponse;
      });
    
      itBehavesLikeACommitMessageParser(context);
      itBehavesLikeABuildStateParser(context);
      itBehavesLikeADurationParser(context);
    });

    describe("Unsupported parsing", function() {
      var alertSpy;

      beforeEach(function() {
        alertSpy = spyOn(window, 'alert');
      });

      it("generates an alert", function() {
        var statusParser = new StatusParser('Unkown CI');
        statusParser.parse({});
        expect(alertSpy).toHaveBeenCalled();
      });
    });
  });
});
