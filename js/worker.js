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

	switch(effect){
		case 'enhance':
			Enhanshot.filter.enhance(pix);
			break;
		case 'grayscale':
			Enhanshot.filter.grayscale(pix);
			break;
		case 'sepia':
			Enhanshot.filter.sepia(pix);
			break;
		case 'negaposi':
			Enhanshot.filter.negaposi(pix);
			break;
		case 'blur':
			Enhanshot.filter.blur(pix, width, height);
			break;
		case 'mirrorVertical':
			Enhanshot.filter.mirrorVertical(pix, width, height);
			break;
		case 'mirrorHorizontal':
			Enhanshot.filter.mirrorHorizontal(pix, width, height);
			break;
		case 'opacity':
			Enhanshot.filter.opacity(pix);
			break;
		case 'threshold':
			Enhanshot.filter.threshold(pix);
			break;
		case 'hueRotate':
			Enhanshot.filter.hueRotate(pix, 180); // 180 / 360 = 50%
			break;
		case 'saturate':
			Enhanshot.filter.saturate(pix, 200); // 200 is 200%
			break;
		case 'contrast':
			Enhanshot.filter.contrast(pix, 200); // 200 is 200%
			break;
		default:
			Enhanshot.filter.enhance(pix);
			break;
	}

	imgd['pixels'].data = pix;

	return imgd;
};
