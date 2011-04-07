(function($) {
  $.fn.twinkle = function() {
    $(this).find('.current_build').each(function() {
      var duration = 500,
          iterations = 4,
          element = this,
          defaultOpacity = $(this).css('opacity');

      var updateOpacity = function(i, percentage) {
        $(element).animate({ opacity:percentage }, duration);
      };

      for(iterations; iterations > 0; iterations--) {
        $.each([1, defaultOpacity], updateOpacity);
      }
    });
  };

  var moving = false;
  $.fn.ascend = function(callback) {
    $(this).each(function() {
      if(moving === false) {
        moving = true;
        var clone = $('.projects').clone(),
            index = $('.projects li').index($(this));

        $(clone).prepend($(clone).find('li')[index]);

        $('#projects').quicksand($(clone).children().get(), { useScaling: true, easing: 'easeInOutQuad', attribute: 'id' }, function() {
          $('.projects li').css('opacity', 'auto');
          callback();
          moving = false;
        });
      }
    });
  };
})(jQuery);
