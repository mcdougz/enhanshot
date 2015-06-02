onmessage = function(e){
	postMessage(filter(e.data))
};

function filter(imgd){

	var effect = imgd.effects;
	var pix = imgd.pixels.data;

	switch(effect){
		case 'enhance':
			enhance(pix);
			console.log('Basic enhancement');
			break;
		case 'grayscale':
			enhance(pix); // TODO: add grayscale()
			console.log('Grayscale enhancement');
			break;
		case 'sepia':
			enhance(pix); // TODO: add sepia()
			console.log('Sepia enhancement');
			break;
		case 'negaposi':
			enhance(pix); // TODO: add negaposi()
			console.log('Nega-Posi enhancement');
			break;
		case 'blur':
			enhance(pix) // TODO: add blur()
			console.log('Blur enhancement');
		default:
			enhance(pix);
			break;
	}

	imgd['pixels'].data = pix;

	return imgd;
}

function enhance(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] =　pix[i] * 1.24; // red
		pix[i+1] =　pix[i+1] * 1.24; // green
		pix[i+2] =　pix[i+2] * 1.24; // blue
	}
}