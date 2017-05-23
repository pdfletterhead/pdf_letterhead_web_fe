$(function() {

  var GuidedTour = function (steps, options) {
    $(document)
    .on('click', '[data-toggle=popover]', function () {
      var $context = $($(this).data('target')).popover('show');
      var scrollTop = $context.data('bs.popover').$tip.offset().top - $(window).height() / 2;
      $('html, body').clearQueue().animate({scrollTop: Math.max(scrollTop, 0)}, 'fast');
      return false;
    })

    .on('click', '[data-dismiss="popover"]', function () {
      $(this).closest('.popover').data('bs.popover').hide();

      if($(this).hasClass('closetour')){

        $('#btn_save').fadeOut();
        $('#result').css("background-color","transparent");
      }

      return false;
    });

    return {
      start: function () {
        var toursteps = [];
        var defaults = {
          html: true,
          placement: 'auto top',
          container: 'body',
          trigger: 'manual'
        };
        var opts = $.extend(defaults, options);
        $(steps).each(function (i, step) {
          if (step.target) {
            var $target = $(step.target);
            if (!$target.length) {
              console.warn('Target not found', $target);
              return;
            }
            if (step.content instanceof $) step.content = step.content.html();
            var content = step.content;
            step.content = function () {
              var out = content;
              out += '<div class="mm_actions clearfix">';
              if (i + 1 < steps.length) {
                out += '<button type="button" class="btn btn-primary pull-right" autofocus data-dismiss="popover" data-toggle="popover" data-target="'+steps[i + 1].target+'">'+$('#tour-next-title').html().trim()+'</button>';
              }
              out += '<button type="button" class="closetour btn btn-default pull-right" data-dismiss="popover">'+$('#tour-close-title').html().trim()+'</button>';
              out += '</div>';
              return out;
            }
            toursteps.push($target.popover($.extend(opts, step)));
          }
        });
        if (toursteps[0]) toursteps[0].popover('show');
      }
    }
  };

  $('#modal').modal();



  $('#modal #start').click(function () {
    var tour = GuidedTour([
      {
      target: '#background',
      title: $('#tour-step1-title'),
      placement: 'bottom',
      content: $('#tour-step1-info'),
    },
    {
      target: '#source',
      title: $('#tour-step2-title'),
      placement: 'bottom',
      content: $('#tour-step2-info')
    },
    {
      target: '#result',
      title: $('#tour-step3-title'),
      placement: 'left',
      content: $('#tour-step3-info')
    },
    {
      target: '#btn_save',
      placement: 'left',
      title: $('#tour-step4-title'),
      content: $('#tour-step4-info')
    },
    ]);

    $('#result').css("background-color","white");
    $('#btn_save').fadeIn();

    tour.start();
  });

});
