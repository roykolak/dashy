describe("Config JSON", function() {
  it("should contain a people property of an array", function() {
    expect($.isArray(config.people)).toBeTruthy();
  });
  
  it("should contain a builds property of an array", function() {
    expect($.isArray(config.builds)).toBeTruthy();
  });
  
  describe("the builds array", function() {
    it("should contain a hash for each build with specific properties set", function() {
      var build = config.builds[0];
      expect(build.name).toBeDefined();
      expect(build.url).toBeDefined();
    });
  });
});