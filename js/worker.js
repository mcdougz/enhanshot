// get message from worker in enhanshot.js
onmessage = function(e){
	postMessage(filter(e.data))
};

// apply filter based on effect name
function filter(imgd){

	var effect = imgd.effects; // effect name
	var pixraw = imgd.pixels; // context.getImageData()
	var pix = pixraw.data; // image data (pixels)
	var width = pixraw.width; // image width
	var height = pixraw.height; // image height

	switch(effect){
		case 'enhance':
			enhance(pix);
			console.log('Basic enhancement');
			break;
		case 'grayscale':
			grayscale(pix); // TODO: add grayscale()
			console.log('Grayscale enhancement');
			break;
		case 'sepia':
			sepia(pix); // TODO: add sepia()
			console.log('Sepia enhancement');
			break;
		case 'negaposi':
			negaposi(pix); // TODO: add negaposi()
			console.log('Nega-Posi enhancement');
			break;
		case 'blur':
			blur(pix, width, height) // TODO: add blur()
			console.log('Blur enhancement');
			break;
		case 'mirrorVertical':
			mirrorVertical(pix, width, height);
			console.log('Mirror Vertical enhancement');
			break;
		case 'mirrorHorizontal':
			mirrorHorizontal(pix, width, height);
			console.log('Mirror Horizontal enhancement');
			break;
		case 'opacity':
			opacity(pix);
			console.log('Opacity enhancement');
			break;
		case 'threshold':
			threshold(pix);
			console.log('Threshold enhancement');
			break;
		default:
			enhance(pix);
			break;
	}

	imgd['pixels'].data = pix;

	return imgd;
}

// basic filter for enhancing photos
function enhance(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] =　pix[i] * 1.24; // red
		pix[i+1] =　pix[i+1] * 1.24; // green
		pix[i+2] =　pix[i+2] * 1.24; // blue
	}
}
// 
function grayscale(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		// calculated from NTSC
		var grayscale = pix[i] * .29 + pix[i+1] * .58 + pix[i+2] * .11;
		pix[i] = grayscale;
		pix[i+1] = grayscale;
		pix[i+2] = grayscale;
	}
}

function sepia(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = pix[i] * 1.07;
		pix[i+1] = pix[i+1] * .74;
		pix[i+2] = pix[i+2] * .43;
	}
}

function negaposi(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = 255 - pix[i];
		pix[i+1] = 255 - pix[i+1];
		pix[i+2] = 255 - pix[i+2];
	}
}
function blur(pix, width, height){
	// TODO: blur alrgorithum
}
function mirrorVertical(pix, width, height){
	// TODO: mirror vertical alrgorithum
}

function mirrorHorizontal(pix, width, height){
	// TODO: mirror horizontal alrgorithum
}
function opacity(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i+3] = pix[i+3] * .5;
	}
}
function brighten(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] += 10;
		pix[i+1] += 10;
		pix[i+2] += 10;
	}
}
// calculte for each pixels.
// if the pixel's rgb is higher than threshold return black
// otherwise return white
function threshold(pix){
	var r; //red
	var g; //green
	var b; //blue
	var t; //threshold value
	for (var i = 0, n = pix.length; i < n; i += 4){
		r = pix[i]; // red value of image data
		g = pix[i+1]; // green value of image data
		b = pix[i+2]; // blue value of image data
		// calculated from NTSC
		threshold = (r * .29 + g * .58 + b * .11); // threshold
		value = (r + g + b) * .33; // average
		v = (threshold >= value) ? 255 : 0; // black or white
		pix[i] = v;
		pix[i+1] = v;
		pix[i+2] = v;
	}
}

