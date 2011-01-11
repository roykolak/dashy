function Ping(config) {
  var buildElement;

  return {
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

    setStatus: function(status) {
      $(buildElement).removeClass('failure success');

      if(status == 'success') {
        $(buildElement).addClass('success');
      } else if(status == 'failure') {
        $(buildElement).addClass('failure');
      }

      if(typeof(this.previousBuild) == 'undefined') {
        this.previousBuild = status;
      }

      if (this.previousBuild != status) {
        $(buildElement).twinkle();
      };

      if(this.previousBuild != 'failure' && status == 'failure') {
        Audio.failure.play();
      }

      this.previousBuild = status;
    },

    update: function(data) {
      var self = this;
      $.get(config.url, function(data) {
        self.responseHandler(statusParser.parse(data));
      });
    },

    responseHandler: function(response) {
      this.setStatus(response.status);
    }
  }
}