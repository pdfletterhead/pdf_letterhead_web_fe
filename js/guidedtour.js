function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
  var washere = getCookie("washere");
  if (washere == "first") {
    returningVisiter(1);
    setCookie("washere", 'second', 365);
  } else if (washere == "second"){
    returningVisiter(2);
    setCookie("washere", 'more', 365);
  } else if (washere == "more"){
    returningVisiter(3);

  } else {

    $('#modal').modal();

    setCookie("washere", 'first', 365);
  }
}

function returningVisiter(visit){
  if(visit == 1) {
  }
  else if (visit == 2){
    $('.show-second').removeClass('hidden');
  }
  else if (visit > 2){
    $('.show-second').removeClass('hidden');
    $('.show-more').removeClass('hidden');
  }
}

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

  $('#modal #start, .tourstart').click(function () {
    var tour = GuidedTour([
      {
      target: '#background',
      title: $('#tour-step1-title').html(),
      placement: 'bottom',
      content: $('#tour-step1-info'),
    },
    {
      target: '#source',
      title: $('#tour-step2-title').html(),
      placement: 'bottom',
      content: $('#tour-step2-info')
    },
    {
      target: '#result',
      title: $('#tour-step3-title').html(),
      placement: 'left',
      content: $('#tour-step3-info')
    },
    {
      target: '#btn_save',
      placement: 'left',
      title: $('#tour-step4-title').html(),
      content: $('#tour-step4-info')
    },
    {
      target: '#downloadmac',
      placement: 'bottom',
      title: $('#tour-step5-title').html(),
      content: $('#tour-step5-info')
    },
    {
      target: '#startrondleiding',
      placement: 'bottom',
      title: $('#tour-step6-title').html(),
      content: $('#tour-step6-info')
    },

    ]);

    $('#result').css("background-color","white");
    $('#btn_save').fadeIn();

    tour.start();
  });

  checkCookie();

});
