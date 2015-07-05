Worker.util = {};
/*==============================================
Conversion between rgb & hsv
==============================================*/
// http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
Worker.util.rgb2hsv = function(r, g, b){
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
Worker.util.hsv2rgb = function(h, s, v){
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
