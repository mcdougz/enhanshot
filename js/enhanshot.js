function process(img){

	// effect set in dataset
	var effect = img.dataset.effect;
	// create canvas
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;

	// get context reference
	var context = canvas.getContext("2d");
	// draw img onto canvas
	context.drawImage(img, 0, 0);
	// extract pixels data
	var pixels = context.getImageData(0, 0, img.width, img.height);

	// send the pixels to a worker thread
	var worker = new Worker('js/worker.js');
	var obj = { 
		pixels: pixels,
		effects: effect
	}
	worker.postMessage(obj);

	// get message from the worker thread
	worker.onmessage = function(e){
		// debug
		if (typeof e.data === "string"){
			console.log("Worker: " + e.data)
			return;
		}

		var new_pixels = e.data.pixels;
		context.putImageData(new_pixels, 0, 0);
		img.src = canvas.toDataURL();
	}
}

$('#convertBtn').on('click', function(e){
	Array.prototype.forEach.call(document.querySelectorAll('.convert-img'), function(node){
		process(node);
	});
	// toast for showing error message
	var toast = $('#toast');
	toast.fadeIn('fast');
	toast.delay(2400);
	toast.fadeOut('slow');
});