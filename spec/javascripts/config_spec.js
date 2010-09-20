describe("Config JSON", function() {
  it("should contain a people property of an array", function() {
    expect($.isArray(config.people)).toBeTruthy();
  });
  
  it("should contain a builds property of an array", function() {
    expect($.isArray(config.builds)).toBeTruthy();
  });
});