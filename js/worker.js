onmessage = function(e){
	postMessage(filter(e.data))
};

function filter(imgd){

	var pix = imgd.pixels.data;

	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] =　pix[i] * 1.12; // red
		pix[i+1] =　pix[i+1] * 1.12; // green
		pix[i+2] =　pix[i+2] * 1.12; // blue
	}
	imgd['pixels'].data = pix;
	return imgd;
}