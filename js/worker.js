/*==============================================
Basic
==============================================*/
Worker = {};
// get message from worker in enhanshot.js
onmessage = function(e){
	postMessage(Worker.filter(e.data))
};

// apply filter based on effect name
Worker.filter = function(imgd){

	var effect = imgd.effects; // effect name
	var pixraw = imgd.pixels; // context.getImageData()
	var pix = pixraw.data; // image data (pixels)
	var width = pixraw.width; // image width
	var height = pixraw.height; // image height

	switch(effect){
		case 'enhance':
			Worker.enhance(pix);
			console.log('Basic enhancement');
			break;
		case 'grayscale':
			Worker.grayscale(pix); // TODO: add grayscale()
			console.log('Grayscale enhancement');
			break;
		case 'sepia':
			Worker.sepia(pix); // TODO: add sepia()
			console.log('Sepia enhancement');
			break;
		case 'negaposi':
			Worker.negaposi(pix); // TODO: add negaposi()
			console.log('Nega-Posi enhancement');
			break;
		case 'blur':
			Worker.blur(pix, width, height) // TODO: add blur()
			console.log('Blur enhancement');
			break;
		case 'mirrorVertical':
			Worker.mirrorVertical(pix, width, height);
			console.log('Mirror Vertical enhancement');
			break;
		case 'mirrorHorizontal':
			Worker.mirrorHorizontal(pix, width, height);
			console.log('Mirror Horizontal enhancement');
			break;
		case 'opacity':
			Worker.opacity(pix);
			console.log('Opacity enhancement');
			break;
		case 'threshold':
			Worker.threshold(pix);
			console.log('Threshold enhancement');
			break;
		case 'hueRotate':
			Worker.hueRotate(pix, 180); // 180 / 360 = 50%
			console.log('Hue Rotate enhancement');
			break;
		case 'saturate':
			Worker.saturate(pix, 200); // 200 is 200%
			console.log('Saturate enhancement');
			break;
		case 'contrast':
			Worker.contrast(pix, 200); // 200 is 200%
			console.log('Saturate enhancement');
			break;
		default:
			Worker.enhance(pix);
			break;
	}

	imgd['pixels'].data = pix;

	return imgd;
};

/*==============================================
Effects
==============================================*/

// basic filter for enhancing photos
Worker.enhance = function(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] =　pix[i] * 1.24; // red
		pix[i+1] =　pix[i+1] * 1.33; // green
		pix[i+2] =　pix[i+2] * 1.21; // blue
	}
};
// grayscale
Worker.grayscale = function(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		// calculated from NTSC
		var grayscale = pix[i] * .29 + pix[i+1] * .58 + pix[i+2] * .11;
		pix[i] = grayscale;
		pix[i+1] = grayscale;
		pix[i+2] = grayscale;
	}
};

Worker.sepia = function(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = pix[i] * 1.07;
		pix[i+1] = pix[i+1] * .74;
		pix[i+2] = pix[i+2] * .43;
	}
};

Worker.negaposi = function(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = 255 - pix[i];
		pix[i+1] = 255 - pix[i+1];
		pix[i+2] = 255 - pix[i+2];
	}
};
Worker.blur = function(pix, width, height){
	// TODO: blur alrgorithum
};
Worker.mirrorVertical = function(pix, width, height){
	// TODO: mirror vertical alrgorithum
};
Worker.mirrorHorizontal = function(pix, width, height){
	// TODO: mirror horizontal alrgorithum
};
Worker.opacity = function(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i+3] = pix[i+3] * .5;
	}
};
Worker.brighten = function(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] += 10;
		pix[i+1] += 10;
		pix[i+2] += 10;
	}
};
// calculte for each pixels.
// if the pixel's rgb is higher than threshold return black
// otherwise return white
Worker.threshold = function(pix){
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
};
Worker.hueRotate = function(pix, num){
	for (var i = 0, n = pix.length; i < n; i += 4){
		// change from rgb to hsv
		var hsv = Worker.rgb2hsv(pix[i], pix[i+1], pix[i+2]);
		hsv[0] = hsv[0] * num / 360; // hue is from 0 to 360
		var rgb = Worker.hsv2rgb(hsv[0], hsv[1], hsv[2]);
		pix[i] = rgb[0];
		pix[i+1] = rgb[1];
		pix[i+2] = rgb[2];
	}
}
Worker.saturate = function(pix, num){
	for (var i = 0, n = pix.length; i < n; i += 4){
		// change from rgb to hsv
		var hsv = Worker.rgb2hsv(pix[i], pix[i+1], pix[i+2]); // return array
		// change saturation
		hsv[1] = hsv[1] * num / 100; // saturation is from 0 to 100
		// convert from hsv to rgb
		var rgb = Worker.hsv2rgb(hsv[0], hsv[1], hsv[2]);
		pix[i] = rgb[0];
		pix[i+1] = rgb[1];
		pix[i+2] = rgb[2];
	}
};
// see: http://www.w3.org/TR/AERT#color
Worker.contrast = function(pix, num){
	for (var i = 0, n = pix.length; i < n; i += 4){
		
	}
}
/*==============================================
Utils
==============================================*/
// http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
Worker.rgb2hsv = function(r, g, b){
	r = r/255;
	g = g/255;
	b = b/255;

	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);

	var h; // hue
	var s; // saturation
	var v = max; // value

	var diff = max - min;
	s = max == 0 ? 0 : diff/max;

	if(max == min){
		h = 0; //achromatic
	}else{
		switch(max){
			case r:
				h = (g - b) / diff + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / diff + 2;
				break;
			case b:
				h = (r - g) / diff + 4;
				break;
		}
		h /= 6;
	}

	return [h, s, v];
};
Worker.hsv2rgb = function(h, s, v){
	var r; // red
	var g; // green
	var b; // blue

	var i = Math.floor(h * 6); // iterator
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch(i % 6){
		case 0:
			r = v, g = t, b = p;
			break;
		case 1:
			r = q, g = v, b = p;
			break;
		case 2:
			r = p, g = v, b = t;
			break;
		case 3:
			r = p, g = v, b = v;
			break;
		case 4:
			r = t, g = p, b = v;
			break;
		case 5:
			r = v, g = p, b = q;
			break;
	}

	return [r * 255, g * 255, b * 255];
};
