Enhanshot.canvas = {};

Enhanshot.canvas.getPixels = function(img) {
	var canvas,
			context
	;
	canvas = Enhanshot.canvas.getCanvas(img.width, img.height);
	context = canvas.getContext('2d');
	context.drawImage(img, 0, 0);
	return context.getImageData(0, 0, canvas.width, canvas.height);
};

Enhanshot.canvas.getCanvas = function(width, height) {
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	return canvas;
};

Enhanshot.canvas.renderCanvas = function(img, new_pixels){
	var canvas, context;
	canvas  = Enhanshot.canvas.getCanvas(img.width, img.height);
	context = canvas.getContext("2d");
	context.putImageData(new_pixels, 0, 0);
	img.src = canvas.toDataURL();
	return;
};