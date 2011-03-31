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
          it("returns the commit message", function() {
            var result = statusParser.parse({"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[{"date":"2010-12-28T15:34:49.960481Z","msg":"changed checkbox observer to click","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"}],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]})
            expect(result.commitMessage).toEqual('changed checkbox observer to click');
          });
        });
        
        describe("when many commits are being built", function() {
          it("returns the most recent commit message", function() {
            var result = statusParser.parse({"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[{"date":"2010-12-28T15:34:49.960481Z","msg":"changed checkbox observer to click","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"},{"date":"2010-12-28T15:34:49.960481Z","msg":"This is the last commit message","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"}],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]})
            expect(result.commitMessage).toEqual('This is the last commit message');
          });
        });

        describe("when a commit message is not available", function() {
          it("returns an empty string", function() {
            var result = statusParser.parse({"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]})
            expect(result.commitMessage).toEqual('No commit message. :(');
          });
        });
      });

      describe("build states", function() {
        describe("when the build was successful", function() {
          it("returns 'success' and a duration", function() {
            var result = statusParser.parse({"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[{"date":"2010-12-28T15:34:49.960481Z","msg":"changed checkbox observer to click","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"}],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]})
            expect(result.status).toEqual('success');
            expect(result.duration).toEqual(150457);
          });
        });

        describe("when the build was a failure", function() {
          it("returns 'failure'", function() {
            var result = statusParser.parse({"actions":[{"causes":[{"shortDescription":"Started by user anonymous","userName":"anonymous"}]}],"artifacts":[],"building":false,"description":null,"duration":127833,"fullDisplayName":"eup #32","id":"2011-01-03_11-41-14","keepLog":false,"number":32,"result":"ABORTED","timestamp":1294076474309,"url":"http://builder.research/job/Eup/32/","builtOn":"","changeSet":{"items":[],"kind":null},"culprits":[{"absoluteUrl":"http://builder.research/user/Tom%20Kersten","fullName":"Tom Kersten"},{"absoluteUrl":"http://builder.research/user/Roy%20Kolak","fullName":"Roy Kolak"}]});
            expect(result.status).toEqual('failure');
            expect(result.duration).toEqual(127833);
          });
        });

        describe("when the build is building", function() {
          it("returns 'building'", function() {
            var result = statusParser.parse({"actions":[{"causes":[{"shortDescription":"Started by user anonymous","userName":"anonymous"}]},{},{}],"artifacts":[],"building":true,"description":null,"duration":0,"fullDisplayName":"ArlisWebsite #189","id":"2011-01-06_14-44-58","keepLog":false,"number":189,"result":null,"timestamp":1294346698424,"url":"http://builder.research/job/ArlisWebsite/189/","builtOn":"","changeSet":{"items":[],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[]});
            expect(result.status).toEqual('building');
            expect(result.duration).toEqual(0);
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