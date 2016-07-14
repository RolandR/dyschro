function Converter(){

	var converterWorker = new Worker("_js/converterWorker.js");
	
	function convert(settings){

		var imageData = bufferContext.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

		var data = imageData.data;

		//converterWorker.terminate();
		converterWorker.postMessage([settings, data.buffer]);

		converterWorker.onmessage = function(ev){
			
			imageData.data.set(new Uint8ClampedArray(ev.data));
			context.putImageData(imageData, 0, 0);
			
		}
	}

	return {
		 init: init
		,convert: convert
	};
}
