function Converter(){
	
	function convert(settings){

		var imageData = bufferContext.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

		switch(settings.mode){
			case "protan":
				for(var i = 0; i < imageData.data.length; i += 4){
					for(var i = 0; i < imageData.data.length; i += 4){				
						imageData.data[i+0] =
							  imageData.data[i+1] * settings.protanIntensity
							+ imageData.data[i+0] * (1-settings.protanIntensity);
					}
				}
			break;
			case "deutan":
				var RGsum = 0;
				for(var i = 0; i < imageData.data.length; i += 4){
					RGsum = 0;
					RGsum += Math.pow(imageData.data[i+0], 2);
					RGsum += Math.pow(imageData.data[i+1], 2);
			
					imageData.data[i+0] = Math.sqrt(RGsum/2) * settings.deutanIntensity
						+ imageData.data[i+0] * (1-settings.deutanIntensity);
					imageData.data[i+1] = Math.sqrt(RGsum/2) * settings.deutanIntensity
						+ imageData.data[i+1] * (1-settings.deutanIntensity);
				}
			break;
			case "tritan":
				for(var i = 0; i < imageData.data.length; i += 4){				
					imageData.data[i+2] = imageData.data[i+1] * settings.tritanIntensity
						+ imageData.data[i+2] * (1-settings.tritanIntensity);
				}
			break;
			case "coneMonochromacy":
				var RGBsum = 0;
				for(var i = 0; i < imageData.data.length; i += 4){
					RGBsum = 0;
					RGBsum += Math.pow(imageData.data[i+0], 2);
					RGBsum += Math.pow(imageData.data[i+1], 2);
					RGBsum += Math.pow(imageData.data[i+2], 2);
					
					imageData.data[i+0] = Math.sqrt(RGBsum/3);
					imageData.data[i+1] = Math.sqrt(RGBsum/3);
					imageData.data[i+2] = Math.sqrt(RGBsum/3);
				}
			break;
			default:
			break;
		}

		context.putImageData(imageData, 0, 0);
	}

	return {
		 init: init
		,convert: convert
	};
}