function TwitterStatus(status) {
  var message = status,
      hashTags = [];
  
  function findHashTags(message) {
    return message.match(/#[^\s]+/);
  }
  
  return {
    parse: function() {
      while(match = findHashTags(message)) {
        hashTags.push(match[0].replace('#',''));
        message = message.replace(match, '');
      }

      return {
        message: $.trim(message),
        tags: hashTags
      }
    }
  }
}