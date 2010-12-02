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

  var moving = false;
  $.fn.ascend = function(callback) {
    $(this).each(function() {
      if(moving == false) {
        moving = true;
        var buildsClone = $('.builds').clone(),
            buildIndex = $('.builds li').index($(this).parent());

        $(buildsClone).prepend($(buildsClone).find('li')[buildIndex]);
        var builds = $(buildsClone).children().get();
        $('#builds').quicksand(builds, { easing: 'easeInOutQuad', attribute: 'id' }, function() {
          $('.builds li').css('opacity', 'auto');
          callback();
          moving = false;
        });
      }
    });
  }
})(jQuery);