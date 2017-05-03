
/*
	========================================================================

	Color Blindness Tools
	
	A collection of tools for simulating and providing assistance
	with various forms of color vision deficiency.
	
	Copyright (C) 2017 Roland Rytz <roland@draemm.li>
	Licensed under the GNU Affero General Public License Version 3

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

	For more information, see:
	https://draemm.li/various/colorVision/license.txt
	
	========================================================================
 */


var image = new Image();
var imageElement = document.getElementById("image");
var imageContainer = document.getElementById("imageContainer");

var canvas = document.getElementById("render");

var renderer = new Renderer("render");

var mouseSlider = new MouseSlider();

function init(){
	
	window.onresize = scaleCanvas;
	scaleCanvas();

	var dragTarget = document.getElementById("fileDragTarget");
	window.addEventListener('drag', anyDrag);
	window.addEventListener('dragstart', anyDrag);
	window.addEventListener('dragend', anyDrag);
	window.addEventListener('dragover', anyDrag);
	window.addEventListener('dragenter', anyDrag);
	window.addEventListener('dragleave', anyDrag);
	window.addEventListener('drop', anyDrag);

	dragTarget.addEventListener('dragover', dragStart);
	dragTarget.addEventListener('dragenter', dragStart);

	dragTarget.addEventListener('dragleave', dragStop);
	dragTarget.addEventListener('dragend', dragStop);
	dragTarget.addEventListener('drop', dragStop);
	
	window.addEventListener('drop', drop);

	function anyDrag(e){
		e.preventDefault();
		e.stopPropagation();
	}

	function dragStart(e){
		dragTarget.className = "dragOver";
	}

	function dragStop(e){
		dragTarget.className = "";
	}

	function drop(e){
		uploadFile(e.dataTransfer.files);
	}
	
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












