var backgroundSet = false;
var sourceSet = false;

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
    processPDF(file);
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
    processPDF(file);
  });



});

function processPDF(file){
  if(backgroundSet && sourceSet){
    setContentImage(file, $('#result div'));
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
