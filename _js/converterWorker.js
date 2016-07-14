

var working = 0;

onmessage = function(ev){

	working++;
	console.log(working);

	var settings = ev.data[0];
	var data = new Uint8ClampedArray(ev.data[1]);
	
	switch(settings.mode){
		case "protan":
			for(var i = 0; i < data.length; i += 4){
				data[i+0] =
					  data[i+1] * settings.protanIntensity
					+ data[i+0] * (1-settings.protanIntensity);
			}
		break;
		case "deutan":
			var RGsum = 0;
			for(var i = 0; i < data.length; i += 4){
				RGsum = 0;
				RGsum += Math.pow(data[i+0], 2);
				RGsum += Math.pow(data[i+1], 2);
		
				data[i+0] = Math.sqrt(RGsum/2) * settings.deutanIntensity
					+ data[i+0] * (1-settings.deutanIntensity);
				data[i+1] = Math.sqrt(RGsum/2) * settings.deutanIntensity
					+ data[i+1] * (1-settings.deutanIntensity);
			}
		break;
		case "tritan":
			for(var i = 0; i < data.length; i += 4){				
				data[i+2] = data[i+1] * settings.tritanIntensity
					+ data[i+2] * (1-settings.tritanIntensity);
			}
		break;
		case "coneMonochromacy":
			var RGBsum = 0;
			for(var i = 0; i < data.length; i += 4){
				RGBsum = 0;
				RGBsum += Math.pow(data[i+0], 2);
				RGBsum += Math.pow(data[i+1], 2);
				RGBsum += Math.pow(data[i+2], 2);
				
				data[i+0] = Math.sqrt(RGBsum/3);
				data[i+1] = Math.sqrt(RGBsum/3);
				data[i+2] = Math.sqrt(RGBsum/3);
			}
		break;
		default:
		break;
	}

	postMessage(data.buffer);

	working--;

}
