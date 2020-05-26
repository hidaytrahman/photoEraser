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

  function download(canvas) {
    var data = canvas.toDataURI();
    console.log("data", data);
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
      //ctx.fillRect(0, 0, 300, 300);
    };
  }

  // custom brush size
  const brushSizeDOM = document.querySelector("#brushSize");
  let currentBrush = document.querySelector("#currentBrush");

  let brushSize = 5;
  brushSizeDOM.addEventListener("change", function (e) {
    console.log("e", e);
    console.log("this", this.value);
    currentBrush.innerHTML = this.value;
    brushSize = this.value;
  });

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
        console.log(imgWidth + " " + imgHeight);
        _URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;

      console.log(imgWidth + " " + imgHeight);
      init(container, 800, 438, img.src);
    }


  });

  // ----- IMAGE UPLOAD SECTION ---- //

  init(container, 800, 438, currentImg);


})();


/* TODO
	* Features
		- Save Image in png, pdf
		- Image Ration
		- more possible controls
		- Add drag and drop feature
		- Upload image by url
		
	* Fixes
		- ES6 Code Migrations
		- Show Init stuff on load
		- Code refactor
		-
	* More
		- SASS Implementation by SASS kickstart
		- Documentations
		- share image on email
		- collect email id of user
		- Auto object focus and tranceprancy
		- Text Reader

*/