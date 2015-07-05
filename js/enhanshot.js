Enhanshot = {};
Enhanshot.process = function(img){
	var
		context,
		pixels,
		worker,
		obj = {},
		effect = img.dataset.effect
	;

	// extract pixels data
	pixels = Enhanshot.getPixels(img);

	// send the pixels to a worker thread
	worker = new Worker('js/worker.js');
	obj = {
		pixels: pixels,
		effects: effect
	};
	worker.postMessage(obj);

	// get message from the worker thread
	worker.onmessage = function(e){
		// debug
		if (typeof e.data === "string"){
			console.log("Worker: " + e.data)
			return;
		}
		Enhanshot.renderCanvas(img, e.data.pixels);
	}
	return;
};

Enhanshot.getPixels = function(img) {
	var canvas,
			context
	;
	canvas = this.getCanvas(img.width, img.height);
	context = canvas.getContext('2d');
	context.drawImage(img, 0, 0);
	return context.getImageData(0, 0, canvas.width, canvas.height);
};

Enhanshot.getCanvas = function(width, height) {
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	return canvas;
};

Enhanshot.renderCanvas = function(img, new_pixels){
	var canvas, context;
	canvas  = Enhanshot.getCanvas(img.width, img.height);
	context = canvas.getContext("2d");
	context.putImageData(new_pixels, 0, 0);
	img.src = canvas.toDataURL();
	return;
};

Enhanshot.showToast = function(){
	// toast for showing error message
	var toast = $('#toast');
	toast.fadeIn('fast');
	toast.delay(2400);
	toast.fadeOut('slow');
};

$('#convertBtn').on('click', function(e){
	Array.prototype.forEach.call(document.querySelectorAll('.convert-img'), function(node){
		Enhanshot.process(node);
	});
	Enhanshot.showToast();
});