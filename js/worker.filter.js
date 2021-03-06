Worker.filter = {};

/*==============================================
Effects
==============================================*/

// basic filter for enhancing photos
Worker.filter.enhance = function(pix){
	console.log('Basic enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = pix[i] * 1.24; // red
		pix[i+1] = pix[i+1] * 1.33; // green
		pix[i+2] = pix[i+2] * 1.21; // blue
	}
};
// grayscale
Worker.filter.grayscale = function(pix){
	console.log('Grayscale enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		// calculated from NTSC
		var grayscale = pix[i] * .29 + pix[i+1] * .58 + pix[i+2] * .11;
		pix[i] = grayscale;
		pix[i+1] = grayscale;
		pix[i+2] = grayscale;
	}
};

Worker.filter.sepia = function(pix){
	console.log('Sepia enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = pix[i] * 1.07;
		pix[i+1] = pix[i+1] * .74;
		pix[i+2] = pix[i+2] * .43;
	}
};

Worker.filter.negaposi = function(pix){
	console.log('Nega-Posi enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = 255 - pix[i];
		pix[i+1] = 255 - pix[i+1];
		pix[i+2] = 255 - pix[i+2];
	}
};
Worker.filter.blur = function(pix, width, height){
	console.log('Blur enhancement');
	// TODO: blur alrgorithum
};
Worker.filter.mirrorVertical = function(pix, width, height){
	console.log('Mirror Horizontal enhancement');
	var array = [];
	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){

		}
	}
};
Worker.filter.mirrorHorizontal = function(pix, width, height){
	console.log('Mirror Vertical enhancement');
	// TODO: mirror horizontal alrgorithum
};
Worker.filter.opacity = function(pix){
	console.log('Opacity enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i+3] = pix[i+3] * .5;
	}
};
Worker.filter.brighten = function(pix, value){
	console.log('Brighten enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] += value;
		pix[i+1] += value;
		pix[i+2] += value;
	}
};
// calculte for each pixels.
// if the pixel's rgb is higher than threshold return black
// otherwise return white
Worker.filter.threshold = function(pix){
	console.log('Threshold enhancement');
	var
		red,
		green,
		blue,
		value,
		new_value,
		threshold;
	for (var i = 0, len = pix.length; i < len; i += 4){
		red = pix[i]; // red value of image data
		green = pix[i+1]; // green value of image data
		blue = pix[i+2]; // blue value of image data
		// calculated from NTSC
		threshold = (red * .29 + green * .58 + blue * .11); // threshold
		value = (red + green + blue) * .33; // average
		new_value = (threshold >= value) ? 255 : 0; // black or white
		pix[i] = new_value;
		pix[i+1] = new_value;
		pix[i+2] = new_value;
	}
};
Worker.filter.hueRotate = function(pix, num){
	console.log('Hue Rotate enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		// change from rgb to hsv
		var hsv = Worker.util.rgb2hsv(pix[i], pix[i+1], pix[i+2]);
		hsv[0] = hsv[0] * num / 360; // hue is from 0 to 360
		var rgb = Worker.util.hsv2rgb(hsv[0], hsv[1], hsv[2]);
		pix[i] = rgb[0];
		pix[i+1] = rgb[1];
		pix[i+2] = rgb[2];
	}
}
Worker.filter.saturate = function(pix, num){
	console.log('Saturate enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
		// change from rgb to hsv
		var hsv = Worker.util.rgb2hsv(pix[i], pix[i+1], pix[i+2]); // return array
		// change saturation
		hsv[1] = hsv[1] * num / 100; // saturation is from 0 to 100
		// convert from hsv to rgb
		var rgb = Worker.util.hsv2rgb(hsv[0], hsv[1], hsv[2]);
		pix[i] = rgb[0];
		pix[i+1] = rgb[1];
		pix[i+2] = rgb[2];
	}
};
// see: http://www.w3.org/TR/AERT#color
Worker.filter.contrast = function(pix, num){
	console.log('Contrast enhancement');
	for (var i = 0, n = pix.length; i < n; i += 4){
	}
}