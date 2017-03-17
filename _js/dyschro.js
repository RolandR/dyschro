var image = new Image();
var imageElement = document.getElementById("image");
var imageContainer = document.getElementById("imageContainer");

var canvas = document.getElementById("render");

var renderer = new Renderer("render");

var mouseSlider = new MouseSlider();

function init(){
	
	window.onresize = scaleCanvas;
	scaleCanvas();
	
	var src = "lorikeet.jpg";

	loadImage(src);
}

function MouseSlider(){
	var canvasSlider = document.getElementById("canvasSlider");
	var canvasHider = document.getElementById("canvasHiderContainer");

	var relativeWidth = 0.5;

	var mouseX = 0;
	var oldWidth;
	var dragging = false;

	canvasSlider.onmousedown = function(e){
		mouseX = e.clientX;
		oldWidth = canvasHider.offsetWidth;
		dragging = true;
		canvasSlider.className = "sliding";
		e.preventDefault();
	}

	document.onmousemove = function(e){
		if(dragging){

			var width = oldWidth + e.clientX - mouseX;

			if(width < 0){
				width = 0;
			} else if(width > canvas.clientWidth){
				width = canvas.clientWidth;
			}

			canvasHider.style.width = width + "px";
			e.preventDefault();
			
		}
	}

	document.onmouseup = function(e){
		if(dragging){
			dragging = false;
			relativeWidth = canvasHider.clientWidth / canvas.clientWidth;
			canvasSlider.className = "";
			e.preventDefault();
		}
	}

	function resize(){
		canvasHider.style.width = (canvas.clientWidth*relativeWidth)+"px";
	}

	return {
		resize: resize
	};
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
	canvas.height = image.height;

	renderer.setImage(image);
	renderer.render(settings);

	scaleCanvas();
}

function scaleCanvas(){
	canvas.style.height = ~~(imageElement.scrollHeight) + "px";
	canvas.style.width = ~~(imageElement.scrollWidth) + "px";
	mouseSlider.resize();
}

init();












