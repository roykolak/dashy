describe("StatusParser", function() {
  var statusParser,
      ci = 'Hudson';

  beforeEach(function() {
    statusParser = new StatusParser(ci)
  });

  describe("#initialize", function() {
    it("stores the ci name", function() {
      expect(statusParser.ci).toEqual(ci);
    });
  });

  describe("#parse", function() {
    describe("when using hudson", function() {
      describe("commit messages", function() {
        describe("when a commit message is available", function() {
          var response;

          beforeEach(function() {
            response = HudsonResponse.singleCommit;
          });

          it("returns the commit message", function() {
            var result = statusParser.parse(response);
            expect(result.commitMessage).toEqual(response.changeSet['items'][0].msg);
          });
        });
        
        describe("when many commits are being built", function() {
          var response;

          beforeEach(function() {
            response = HudsonResponse.multipleCommits;
          });

          it("returns the most recent commit message", function() {
            var result = statusParser.parse(response)
            expect(result.commitMessage).toEqual(response.changeSet['items'][response.changeSet['items'].length - 1].msg);
          });
        });

        describe("when a commit message is not available", function() {
          it("returns a sad message", function() {
            var result = statusParser.parse(HudsonResponse.noCommitMessage);
            expect(result.commitMessage).toEqual('No commit message. :(');
          });
        });
      });

      describe("build states", function() {
        describe("when the build was 'success'", function() {
          it("returns 'success' as the status", function() {
            var result = statusParser.parse(HudsonResponse.successBuild);
            expect(result.status).toEqual('success');
          });
        });

        describe("when the build was a 'failure'", function() {
          it("returns 'failure' as the status", function() {
            var result = statusParser.parse(HudsonResponse.failureBuild);
            expect(result.status).toEqual('failure');
          });
        });

        describe("when the build is 'building'", function() {
          it("returns 'building' as the status", function() {
            var result = statusParser.parse(HudsonResponse.buildingBuild);
            expect(result.status).toEqual('building');
          });
        });
      });

      describe("duration", function() {
        describe("when the build is 'building'", function() {
          it("returns a duration of zero", function() {
            var result = statusParser.parse(HudsonResponse.buildingBuild);
            expect(result.duration).toEqual(0);
          });
        });

        describe("when the build is not building", function() {
          it("returns the duration value", function() {
            var result = statusParser.parse(HudsonResponse.failureBuild); 
            expect(result.duration).toEqual(HudsonResponse.failureBuild.duration);
          }); 
        });
      });
    });

    describe("when using a CI system that does not have a parser", function() {
      it("generates an alert", function() {
        var alertSpy = spyOn(window, 'alert');
        statusParser.ci = 'Unkown CI';
        statusParser.parse({});
        expect(alertSpy).toHaveBeenCalled();
      });
    });
  });
});
