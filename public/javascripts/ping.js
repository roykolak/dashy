function Ping(config) {
  var pingId = config.name.replace(/ /g,"_"),
      currentBuild = '#' + pingId + ' .current_build';

  var statusParser = new StatusParser(config.ci);

  $.template("ping", "<li id='${pingId}' class='ping'><div class='wrapper'><div class='current_build'></div><h3 class='name'>${name}</h3></div></li>");

  return {
    ping: null,

    render: function() {
      $.tmpl('ping', {pingId: pingId, name: config.name}).appendTo('#pings');
    },

    setStatus: function(newStatus) {
      if(this.status == null) {
        this.status = newStatus;
      }
      if(newStatus == 'building') {
        newStatus = this.status;
      }

      this.updateElementClasses(newStatus);
      this.reactVisually(newStatus);
      this.playSound(newStatus);

      this.status = newStatus;
    },

    updateElementClasses: function(newStatus) {
      $(currentBuild).removeClass('failure success');

      if(newStatus == 'success') {
        $(currentBuild).addClass('success');
      } else if(newStatus == 'failure') {
        $(currentBuild).addClass('failure');
      }
    },

    reactVisually: function(newStatus) {
      if (this.status != newStatus) {
        $(currentBuild).twinkle();
      }
    },

    playSound: function(newStatus) {
      if(this.status != 'failure' && newStatus == 'failure') {
        Audio.failure.play();
      }
    },

    update: function(data) {
      var self = this;
      $.getJSON(config.url, function(data) {
        self.responseHandler(statusParser.parse(data));
      });
    },

    responseHandler: function(response) {
      this.setStatus(response.status);
    }
  }
}
