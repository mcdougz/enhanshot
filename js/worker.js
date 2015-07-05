/*==============================================
Basic
==============================================*/
Worker = {};
// get message from worker in enhanshot.js
onmessage = function(e){
	postMessage(Worker.process(e.data))
};

// apply filter based on effect name
Worker.process = function(imgd){
	var
		effect = imgd.effects, // effect name
		pixraw = imgd.pixels, // context.getImageData()
		pix = pixraw.data, // image data (pixels)
		width = pixraw.width, // image width
		height = pixraw.height; // image height

	importScripts(
		'worker.filter.js',
		'worker.util.js'
	);
	switch(effect){
		case 'enhance':
			Worker.filter.enhance(pix);
			break;
		case 'grayscale':
			Worker.filter.grayscale(pix);
			break;
		case 'sepia':
			Worker.filter.sepia(pix);
			break;
		case 'negaposi':
			Worker.filter.negaposi(pix);
			break;
		case 'blur':
			Worker.filter.blur(pix, width, height);
			break;
		case 'mirrorVertical':
			Worker.filter.mirrorVertical(pix, width, height);
			break;
		case 'mirrorHorizontal':
			Worker.filter.mirrorHorizontal(pix, width, height);
			break;
		case 'opacity':
			Worker.filter.opacity(pix);
			break;
		case 'threshold':
			Worker.filter.threshold(pix);
			break;
		case 'brighten':
			Worker.filter.brighten(pix, 10);
			break;
		case 'hueRotate':
			Worker.filter.hueRotate(pix, 180); // 180 / 360 = 50%
			break;
		case 'saturate':
			Worker.filter.saturate(pix, 200); // 200 is 200%
			break;
		case 'contrast':
			Worker.filter.contrast(pix, 200); // 200 is 200%
			break;
		default:
			Worker.filter.enhance(pix);
			break;
	}

	imgd['pixels'].data = pix;

	return imgd;
};


