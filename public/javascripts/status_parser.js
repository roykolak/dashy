function StatusParser(ci) {

  function hudsonParser(data) {
    var result = {};
    if(data.building) {
      result.status = 'building';
    } else {
      result.status = (data.result == 'SUCCESS' ? 'success' : 'failure');
    }
    result.duration = data.duration
    return result;
  }

  return {
    ci: ci,

    parse: function(data) {
      switch(this.ci) {
        case 'Hudson':
          return hudsonParser(data);
        default:
          alert("I don't know that CI system, can you tell me how to parse it?");
      }
    }
  }
}