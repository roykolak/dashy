describe('Ping', function() {
  var ping;

  beforeEach(function() {
    ping = new Ping({name: 'test project'});
  });

  describe('initialize', function() {
    it('generates a dom id', function() {
      expect(ping.get('domId')).toEqual('test_project');
    });
  });
});
