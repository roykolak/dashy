function Ping(config) {
  var buildElement;

  var statusParser = new StatusParser(config.ci);

  return {
    ping: null,

    buildAndInsertElements: function() {
      buildElement = $(document.createElement('div'));
      var pingElement = $(document.createElement('li')),
          wrapperElement = $(document.createElement('div')),
          nameElement = $(document.createElement('h3'));

      $(pingElement).addClass('ping');
      $(wrapperElement).addClass('wrapper')
      $(buildElement).addClass('current_build');
      $(nameElement).addClass('name').text(config.name);
      $(wrapperElement).append(buildElement, nameElement);
      $(pingElement).append(wrapperElement);
      $('#pings').append(pingElement);
    },

    setStatus: function(newStatus) {
      if(this.status == null) {
        this.status = newStatus;
      }

      this.updateElementClasses(newStatus);
      this.reactVisually(newStatus);
      this.playSound(newStatus);

      this.status = newStatus;
    },

    updateElementClasses: function(newStatus) {
      $(buildElement).removeClass('failure success');

      if(newStatus == 'success' || newStatus == 'building') {
        $(buildElement).addClass('success');
      } else if(newStatus == 'failure') {
        $(buildElement).addClass('failure');
      }
    },

    reactVisually: function(newStatus) {
      if (this.status != newStatus) {
        $(buildElement).twinkle();
      };
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