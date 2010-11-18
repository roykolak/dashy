(function($) {
  $.fn.twinkle = function() {
    $(this).each(function() {
      var duration = 500,
          iterations = 4,
          element = this,
          defaultOpacity = $(this).css('opacity');

      for(iterations; iterations > 0; iterations--) {
        $.each([1, defaultOpacity], function(i, percentage) {
          $(element).animate({ opacity:percentage }, duration);
        });
      }
    });
  }
  
  $.fn.ascend = function() {
    $(this).each(function() {
      var element = $(this).parent();
      if($('#builds li').index(element) != 0) {
        $(element).slideUp('fast', function() {
          $('#builds').prepend(element);
          $(element).slideDown();
        });
      }
    });
  }
})(jQuery);