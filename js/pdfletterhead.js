var backgroundSet = false;
var sourceSet = false;
var download_link = "";

$(function() {

  $('.dropzone').on('dragover', function() {
    $(this).addClass('hover');
  });

  $('.dropzone').on('dragleave', function() {
    $(this).removeClass('hover');
  });

  /*
  $('#btn_save').on('click', function() {
    event.preventDefault();
    if(download_link == '') {
      console.log('nothing to download');
    }
    else{
      window.open(download_link,'_blank');
      $('#btn_save').click();
      //download(download_link,'filename.pdf', 'application/pdf');
    }
  });
 */

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

    var data = new FormData($('#appform')[0]);

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/items.json',
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
        $('#btn_save').fadeIn();
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
