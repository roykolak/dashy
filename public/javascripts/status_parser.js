function StatusParser(ci) {
  var noCommitMessageSubstitute = 'No commit message. :(';

  function hudsonParser(data) {
    var result = {};
    if(data.building) {
      result.status = 'building';
    } else {
      result.status = (data.result == 'SUCCESS' ? 'success' : 'failure');
    }
    
    result.commitMessage = (data.changeSet.items.length > 0 ? data.changeSet.items.last().msg : 'No commit message. :(');
    result.duration = data.duration;
    return result;
  }

  function customParser(data) {
    var commitMessage, duration = 0;

    if(data.commits) {
      if(data.commits.length > 0) {
        commitMessage = data.commits.last();
      } else {
        commitMessage = noCommitMessageSubstitute;
      }
    } else {
      commitMessage = noCommitMessageSubstitute;
    }
    
    if(data.status != 'building') {
      duration = data.duration;
    }

    var result = {
      status: data.status,
      commitMessage: commitMessage,
      duration: duration 
    };
    return result;
  }

  return {
    ci: ci,
    noCommitMessageSubstitute: noCommitMessageSubstitute, 

    parse: function(data) {
      if(this.ci === 'Hudson') {
        return hudsonParser(data);
      } else if(this.ci === 'Custom') {
        return customParser(data);
      } else {
        alert("I don't know that CI system, can you tell me how to parse it?");
      }
    }
  };
}
