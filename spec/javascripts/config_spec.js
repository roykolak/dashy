describe("Config JSON", function() {
  it("contains a projects property of an array", function() {
    expect($.isArray(config.projects)).toBeTruthy();
  });

  it("contains a title propert", function() {
    expect(config.title).toBeDefined();
  });

  describe("sounds", function() {
    it("contains the path to the default success sound", function() {
      expect(config.sounds.success).toEqual('sounds/success.mp3');
    });

    it("contains the path to the default building sound", function() {
      expect(config.sounds.building).toEqual('sounds/building.mp3');
    });

    it("contains the path to the default failure sound", function() {
      expect(config.sounds.failure).toEqual('sounds/failure.mp3');
    });
  });


  describe("the projects array", function() {
    it("contains a hash for each project", function() {
      expect(config.projects[0]).toBeDefined();
    });

    describe("a project", function() {
      var project;

      beforeEach(function() {
        project = config.projects[0];
      });

      it("contains a name", function() {
        expect(project.name).toBeDefined();
      });

      it("contains a url", function() {
        expect(project.url).toBeDefined();
      });

      it("contains a ci name", function() {
        expect(project.ci).toBeDefined();
      });
    });
  });

  describe("the pings array", function() {
    it("contains a hash for each ping", function() {
      expect(config.pings[0]).toBeDefined();
    });

    describe("a ping", function() {
      var ping;

      beforeEach(function() {
        ping = config.pings[0];
      });

      it("contains a name", function() {
        expect(ping.name).toBeDefined();
      });

      it("contains a url", function() {
        expect(ping.url).toBeDefined();
      });
    });
  });
});