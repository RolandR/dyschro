
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


function Renderer(canvasId){

	var canvas = document.getElementById(canvasId);
	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	var shaderProgram;
	var size;

	var modeAttr;
	var colorTransformAttr;
	var intensityAttr;
	var contrastLossAttr;
	var acuityLossAttr;
	var texResolutionAttr;

	var lastHeight = canvas.height;
	var lastWidth = canvas.width;

	init();

	function init(){

		/*=========================Shaders========================*/


		// Create a vertex shader object
		var vertShader = gl.createShader(gl.VERTEX_SHADER);

		// Attach vertex shader source code
		gl.shaderSource(vertShader, vertexShader);

		// Compile the vertex shader
		gl.compileShader(vertShader);

		// Create fragment shader object
		var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

		// Attach fragment shader source code
		gl.shaderSource(fragShader, fragmentShader);

		// Compile the fragmentt shader
		gl.compileShader(fragShader);

		// Create a shader program object to store
		// the combined shader program
		shaderProgram = gl.createProgram();

		// Attach a vertex shader
		gl.attachShader(shaderProgram, vertShader); 

		// Attach a fragment shader
		gl.attachShader(shaderProgram, fragShader);

		// Link both programs
		gl.linkProgram(shaderProgram);

		// Use the combined shader program object
		gl.useProgram(shaderProgram);

		if(gl.getShaderInfoLog(vertShader)){
			console.warn(gl.getShaderInfoLog(vertShader));
		}
		if(gl.getShaderInfoLog(fragShader)){
			console.warn(gl.getShaderInfoLog(fragShader));
		}
		if(gl.getProgramInfoLog(shaderProgram)){
			console.warn(gl.getProgramInfoLog(shaderProgram));
		}


		vertexBuffer = gl.createBuffer();

		/*==========Defining and storing the geometry=======*/

		var vertices = [
			-1.0,  1.0,
			 1.0,  1.0,
			-1.0, -1.0,
			-1.0, -1.0,
			 1.0,  1.0,
			 1.0, -1.0
		];

		size = ~~(vertices.length/2);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

		// Get the attribute location
		var coord = gl.getAttribLocation(shaderProgram, "coordinates");

		// Point an attribute to the currently bound VBO
		gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

		// Enable the attribute
		gl.enableVertexAttribArray(coord);

		modeAttr = gl.getUniformLocation(shaderProgram, "mode");
		colorTransformAttr = gl.getUniformLocation(shaderProgram, "colorTransform");
		intensityAttr = gl.getUniformLocation(shaderProgram, "intensity");
		contrastLossAttr = gl.getUniformLocation(shaderProgram, "contrastLoss");
		acuityLossAttr = gl.getUniformLocation(shaderProgram, "acuityLoss");
		texResolutionAttr = gl.getUniformLocation(shaderProgram, "texResolution");

		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	}

	function setImage(image){
		
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		
	}

	function render(settings){

		if(settings.tab == "simulate"){
			switch(settings.mode){
				case "protan":
					var transform = getInterpolatedTransform(colorTransforms.protan, settings.protanIntensity*10);
					gl.uniformMatrix3fv(colorTransformAttr, false, transform);
					gl.uniform1i(modeAttr, 0);
					gl.uniform1f(intensityAttr, settings.protanIntensity);
				break;
				case "deutan":
					var transform = getInterpolatedTransform(colorTransforms.deutan, settings.deutanIntensity*10);
					gl.uniformMatrix3fv(colorTransformAttr, false, transform);
					gl.uniform1i(modeAttr, 1);
					gl.uniform1f(intensityAttr, settings.deutanIntensity);
				break;
				case "tritan":
					var transform = getInterpolatedTransform(colorTransforms.tritan, settings.tritanIntensity*10);
					gl.uniformMatrix3fv(colorTransformAttr, false, transform);
					gl.uniform1i(modeAttr, 2);
					gl.uniform1f(intensityAttr, settings.tritanIntensity);
				break;
				case "rodMonochromacy":
					gl.uniform1i(modeAttr, 3);
					gl.uniform1f(contrastLossAttr, settings.contrastLoss);
					gl.uniform2f(texResolutionAttr, image.width, image.height);
					canvas.style.filter = "blur("+settings.acuityLoss*30+"px)";
				break;
				default:
				break;
			}
		} else if(settings.tab == "support"){
			switch(settings.tool){
				case "highlight":
					switch(settings.highlightColor){
						case "red":
							gl.uniform1i(modeAttr, 10);
						break;
						case "green":
							gl.uniform1i(modeAttr, 11);
						break;
						case "blue":
							gl.uniform1i(modeAttr, 12);
						break;
						case "yellow":
							gl.uniform1i(modeAttr, 13);
						break;
					}
				break;
				case "saturate":
					gl.uniform1i(modeAttr, 20);
					gl.uniform1f(intensityAttr, settings.saturateIntensity);
				break;
				case "rotate":
					gl.uniform1i(modeAttr, 30);
					gl.uniform1f(intensityAttr, settings.rotateAngle);
				break;
				case "replace":
					var transform = [
						0, 0, 0,
						0, 0, 0,
						0, 0, 0
					];
					
					transform[  settings.replaceRed] = 1;
					transform[3+settings.replaceGreen] = 1;
					transform[6+settings.replaceBlue] = 1;
					
					gl.uniform1i(modeAttr, 40);
					gl.uniformMatrix3fv(colorTransformAttr, false, transform);
				break;
				default:
				break;
			}
		}

		if(lastHeight != canvas.height || lastWidth != canvas.width){
			gl.viewport(0, 0, canvas.width, canvas.height);
		}

		gl.drawArrays(gl.TRIANGLES, 0, size);

		lastHeight = canvas.height;
		lastWidth = canvas.width;
		
	}

	return{
		 setImage: setImage
		,render: render
	};

}



















