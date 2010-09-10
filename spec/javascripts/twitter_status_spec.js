describe("TwitterStatus", function() {
  describe("#parse", function() {
    var status = 'This is a twitter status #sad #late',
        parsedStatus;

    beforeEach(function() {
      parsedStatus = new TwitterStatus(status).parse();
    });
    
    it("returns the message w/ all hash tags excluded", function() {
      expect(parsedStatus.message).toEqual('This is a twitter status');
    });

    it("returns an array of found hash tags", function() {
      expect(parsedStatus.hashTags).toEqual(['#sad', '#late']);
    });
  });
});