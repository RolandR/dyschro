var image = new Image();
var imageElement = document.getElementById("image");
var imageContainer = document.getElementById("imageContainer");

/*var bufferCanvas = document.getElementById("buffer");
var bufferContext = buffer.getContext("2d");*/

var canvas = document.getElementById("render");
/*var context = canvas.getContext("2d");*/

//var converter = new Converter();

var renderer = new Renderer("render");

function init(){
	
	window.onresize = scaleCanvas;
	scaleCanvas();
	
	var src = "lorikeet.jpg";

	loadImage(src);

	var mouseSlider = new MouseSlider();
}

function MouseSlider(){
	var canvasSlider = document.getElementById("canvasSlider");
	var canvasHider = document.getElementById("canvasHiderContainer");

	var mouseX = 0;
	var oldWidth;
	var dragging = false;

	canvasSlider.onmousedown = function(e){
		
		mouseX = e.x;
		oldWidth = canvasHider.offsetWidth;
		dragging = true;
	}

	document.onmousemove = function(e){
		if(dragging){
			var difference = e.x - mouseX;

			canvasHider.style.width = oldWidth + difference + "px";
			
		}
	}

	document.onmouseup = function(e){
		dragging = false;
	}
}

function uploadFile(files){
	var file = files[0];
	if(file){
		if(file.type == "image/jpeg" || file.type == "image/png"){
			var objectUrl = window.URL.createObjectURL(file);
			loadLocalImage(objectUrl);
		}
	}
}

function loadImage(imageName){
	
	var src = "./_exampleImages/"+imageName;
	var thumbSrc = "./_exampleImages/thumbs/"+imageName;

	image.onload = prepareImage;
	image.src = src;
	imageElement.src = src;
	document.getElementById("thumbnailImage").src = thumbSrc;

	hideOverlay();
	
}

function loadLocalImage(objectUrl){

	image.onload = function(){
		window.URL.revokeObjectURL(this.src);
		prepareImage();
	}
	image.src = objectUrl;
	imageElement.src = objectUrl;
	document.getElementById("thumbnailImage").src = objectUrl;

	hideOverlay();
	
}

function showOverlay(){
	document.getElementById("overlay").style.display = "block";
}

function hideOverlay(){
	document.getElementById("overlay").style.display = "none";
}

document.getElementById("overlay").onclick = function(e){
	e.stopPropagation();
	if(e.target == this){
		hideOverlay();
	}
}

document.onkeyup = function(e){
	switch(e.keyCode){
		case 27:
			hideOverlay();
		break;
	}
}

function prepareImage(){

	canvas.width = image.width;
	//bufferCanvas.width = image.width;
	canvas.height = image.height;
	//bufferCanvas.height = image.height;

	//bufferContext.drawImage(image, 0, 0);

	//converter.convert(presets);

	renderer.setImage(image);
	renderer.render(settings);

	scaleCanvas();
}

function scaleCanvas(){
	canvas.style.height = ~~(imageElement.scrollHeight) + "px";
	canvas.style.width = ~~(imageElement.scrollWidth) + "px";
}

init();












