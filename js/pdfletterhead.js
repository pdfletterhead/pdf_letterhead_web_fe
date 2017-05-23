var backgroundSet = false;
var sourceSet = false;
var download_link = "";


// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

$(function() {

  $('.dropzone').on('dragover', function() {
    $(this).addClass('hover');
  });

  $('.dropzone').on('dragleave', function() {
    $(this).removeClass('hover');
  });

  $('#source input').on('change', function(e) {
    var file = this.files[0];
    sourceSet = true;

    $(this).parent().removeClass('hover');

    if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
      return alert('File type not allowed.');
    }

    $(this).parent().addClass('dropped');

    $('#source img').remove();

    setContentImage(file, $('#source div'));
    processPDF();
  });


  $('#background input').on('change', function(e) {
    var file = this.files[0];
    backgroundSet = true;

    $(this).parent().removeClass('hover');

    if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
      return alert('File type not allowed.');
    }

    $(this).parent().addClass('dropped');

    $('#background img').remove();

    setContentImage(file, $('#background div'));
    processPDF();
  });

});

function processPDF(){
  if(backgroundSet && sourceSet){

    $("#hideresulttips").show();
    $("#spinner").fadeIn();

    var data = new FormData($('#appform')[0]);

    $.ajax({
      type: 'POST',
      url: 'http://213.206.241.17:3000/items.json',
      data: data,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function(msg){

        $img = $('<img />').attr('src', msg.png).fadeIn();
        $('#result div').html($img);
        $('#result').css("background-color","white");
        download_link = msg.pdf;
        $('#btn_save').attr('href', download_link);

        $("#hideresulttips").hide();
        $("#spinner").hide();

        $('#btn_save').fadeIn();
        $('#newpdf').fadeIn();
      }
    });
  }
}

function setContentImage(file, destination){
  var reader = new FileReader(file);

  reader.readAsDataURL(file);

  reader.onload = function(e) {
    var data = e.target.result,
    $img = $('<img />').attr('src', data).fadeIn();

    $(destination).html($img);
  };

}


