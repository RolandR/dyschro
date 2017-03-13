
function Renderer(canvasId){

	var canvas = document.getElementById(canvasId);
	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	var shaderProgram;
	var size;

	var modeAttr;
	var colorTransformAttr;
	var intensityAttr;
	var intensityIndexAttr;
	var pixels = new Uint8Array(canvas.width*canvas.height*4);

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

		console.log(gl.getShaderInfoLog(vertShader));
		console.log(gl.getShaderInfoLog(fragShader));
		console.log(gl.getProgramInfoLog(shaderProgram));


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
			case "coneMonochromacy":
				//var transform = getInterpolatedTransform(colorTransforms.protan, settings.protanIntensity*10);
				//gl.uniformMatrix3fv(colorTransformAttr, false, transform);
				gl.uniform1i(modeAttr, 3);
				gl.uniform1f(intensityAttr, settings.monoIntensity);
			break;
			default:
			break;
		}

		if(lastHeight != canvas.height || lastWidth != canvas.width){
			gl.viewport(0, 0, canvas.width, canvas.height);
			//pixels = new Uint8Array(canvas.width*canvas.height*4);
		}

		gl.drawArrays(gl.TRIANGLES, 0, size);

		//gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

		//pixels = pixels.copyWithin(4*canvas.width, 0);

		lastHeight = canvas.height;
		lastWidth = canvas.width;

		//window.setTimeout(function(){render(pixels)}, 100);
		
	}

	return{
		 setImage: setImage
		,render: render
	};

}



















