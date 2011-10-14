describe('Gravatar', function() {
  describe('.url', function() {
    it('returns the url for the requested gravatar', function() {
      var expected = 'http://www.gravatar.com/avatar/7e22e7ad387a66da787a8d18fce1e83b.jpg?s=80';
      expect(Gravatar.url('roy.kolak@gmail.com')).toEqual(expected);
    });
  });
});
