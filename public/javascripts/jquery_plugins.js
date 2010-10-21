(function($) {
  $.fn.twinkle = function() {
    $(this).each(function() {
      var duration = 500,
          iterations = 4,
          element = this,
          background = $(element).css('backgroundColor');

      for(iterations; iterations > 0; iterations--) {
        $.each(['#FFF', background], function(i, color) {
          $(element).animate({ backgroundColor:color }, duration, function() {
            if(iterations == 0) {
              $(element).removeAttr('style');
            }
          });
        });
      }
    });
  }
})(jQuery);