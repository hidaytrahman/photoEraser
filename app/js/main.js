(function () {
  // Creates a new canvas element and appends it as a child
  // to the parent element, and returns the reference to
  // the newly created canvas element

  // create canvas'
  function createCanvas(parent, width, height) {
    var canvas = {};
    canvas.node = document.createElement("canvas");
    canvas.context = canvas.node.getContext("2d");
    canvas.node.id = "mainCanvas";
    canvas.node.width = width || 100;
    canvas.node.height = height || 100;
    parent.appendChild(canvas.node);
    return canvas;
  }


  // draw an image instead color
  function drawImage(ctx, width, height, resource) {
    var tempresource =
      "https://instagram.fdel10-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/97101606_965111277257434_640354039122427793_n.jpg?_nc_ht=instagram.fdel10-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=yf7_-4YE5NAAX-EbfHO&oh=3e4384759cd4aece0231d3e9d7c24fcc&oe=5EEE0E51";
    console.log("resource", resource);
    var img = new Image();
    img.src = resource || tempresource;
    console.log("img", img.width);
    img.onload = function () {
      var pattern = ctx.createPattern(img, "no-repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    };
  }

  createBrush();

  var brushSize = 5;
  function createBrush() {
    // custom brush size
    const brushSizeDOM = document.querySelector("#brushSize");
   
    updateBrush(false, brushSizeDOM);

    brushSizeDOM.addEventListener("change", function (e) {
      updateBrush(this, brushSizeDOM);
    });

  }

  function updateBrush(brush, brushDom) {
    (brush) ? brushSize = brush.value : brushSize = 5;

    let currentBrush = document.querySelector("#currentBrush");
    currentBrush.innerHTML = brushSize;
    brushDom.value = brushSize;
   
  }

  // init functiions
  function init(container, width, height, resource) {
    // one canvas at a time
    container.innerHTML = "";

    var canvas = createCanvas(container, width, height);
    var ctx = canvas.context;

    // define a custom fillCircle method
    ctx.fillCircle = function (x, y, radius) {
      ctx.rect(0, 0, 150, 100);
      this.beginPath();
      this.moveTo(x, y);
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.fill();
    };


    ctx.clearTo = function () {
      drawImage(ctx, width, height, resource);
    };

    ctx.clearTo();

    // bind mouse events
    canvas.node.onmousemove = function (e) {
      if (!canvas.isDrawing) {
        return;
      }
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var radius = brushSize; // or whatever
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillCircle(x, y, radius);
    };

    canvas.node.onmousedown = function (e) {
      canvas.isDrawing = true;
    };
    canvas.node.onmouseup = function (e) {
      canvas.isDrawing = false;
    };
  }

  // select canvas wrapper
  var container = document.getElementById("canvas");

  var canHeight = 400;
  var canWidth = 800;
  container.style.width = canWidth+'px';
  container.style.height = canHeight+'px';

  // ----- IMAGE UPLOAD SECTION ---- //
  var uploadImg = document.querySelector("#uploadImg");

  var _URL = window.URL || window.webkitURL;
  var currentImg;

  uploadImg.addEventListener("change", function () {
    var file, img, imgWidth, imgHeight;
    if ((file = this.files[0])) {
      img = new Image();
      var objectUrl = _URL.createObjectURL(file);
      img.onload = function () {
        imgWidth = this.width;
        imgHeight = this.height;
        //console.log(imgWidth + " " + imgHeight);
        _URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;

      init(container, canWidth, canHeight, img.src);

      document.getElementById('saveImage').style.display = 'block';
    }


  });

  // ----- IMAGE UPLOAD SECTION ---- //

  init(container, canWidth, canHeight, currentImg);


})();


/* TODO
	* Features
		- Image Ratio
		- more possible controls
		- Add drag and drop feature
		- Upload image by url
		
	* Fixes
		- ES6 Code Migrations
		- Code refactor
		- Mobile event supports
	* More
		- SASS Implementation by SASS kickstart
		- Documentations
		- share image on email
		- collect email id of user
		- Auto object focus and tranceprancy
		- Text Reader

*/
