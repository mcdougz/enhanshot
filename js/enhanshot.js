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
	pixels = Enhanshot.canvas.getPixels(img);

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
		Enhanshot.canvas.renderCanvas(img, e.data.pixels);
	}
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