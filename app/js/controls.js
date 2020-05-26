  // Convert canvas to image
  document.getElementById('saveImage').addEventListener("click", function(e) {
    var canvas = document.querySelector('#mainCanvas');
  
    var dataURL = canvas.toDataURL("image/png", 1.0);
  
    downloadImage(dataURL, 'erased-img.png');
  });
  
  // Save | Download image
  function downloadImage(data, filename = 'untitled.png') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }
  