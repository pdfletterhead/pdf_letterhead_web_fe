function setMozPDF(url, target){
//  var url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';
  PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

  // Asynchronous download of PDF
  var loadingTask = PDFJS.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');
    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById(target);
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.then(function () {
        console.log('Page rendered');
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
}

function setMozPDF2(file,target){

  //
  // Disable workers to avoid yet another cross-origin issue (workers need the URL of
  // the script to be loaded, and dynamically loading a cross-origin script does
  // not work)
  //
  PDFJS.disableWorker = true;
  //
  // Asynchronous download PDF as an ArrayBuffer
  //
  fileReader = new FileReader();
  fileReader.onload = function(ev) {
    console.log(ev);

    PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {
      //
      // Fetch the first page
      //
      console.log(pdf)
      pdf.getPage(1).then(function getPageHelloWorld(page) {
        var scale = 1.5;
        var viewport = page.getViewport(scale);
        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById(target);
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        //
        // Render PDF page into canvas context
        //
        var task = page.render({canvasContext: context, viewport: viewport})
        task.promise.then(function(){
          console.log(canvas.toDataURL('image/jpeg'));
        });
      });
    }, function(error){
      console.log(error);
    });
  };
  fileReader.readAsArrayBuffer(file);
}
