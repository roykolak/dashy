var PingView = Backbone.View.extend({
  tagName: 'div',
  className: 'ping_view',

  render: function() {
    $('#pingTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    return this;
  }
});

//function Ping(config) {
      //currentBuild = '#' + pingId + ' .current_build';

  //var statusParser = new StatusParser(config.ci);


  //return {
    //ping: null,

    //setStatus: function(newStatus) {
      //if(this.status == null) {
        //this.status = newStatus;
      //}
      //if(newStatus == 'building') {
        //newStatus = this.status;
      //}

      //this.updateElementClasses(newStatus);
      //this.reactVisually(newStatus);
      //this.playSound(newStatus);

      //this.status = newStatus;
    //},

    //updateElementClasses: function(newStatus) {
      //$(currentBuild).removeClass('failure success');

      //if(newStatus == 'success') {
        //$(currentBuild).addClass('success');
      //} else if(newStatus == 'failure') {
        //$(currentBuild).addClass('failure');
      //}
    //},

    //reactVisually: function(newStatus) {
      //if (this.status != newStatus) {
        //$(currentBuild).twinkle();
      //}
    //},

    //playSound: function(newStatus) {
      //if(this.status != 'failure' && newStatus == 'failure') {
        //Audio.failure.play();
      //}
    //},

    //update: function(data) {
      //var self = this;
      //$.getJSON(config.url, function(data) {
        //self.responseHandler(statusParser.parse(data));
      //});
    //},

    //responseHandler: function(response) {
      //this.setStatus(response.status);
    //}
  //}
//}
