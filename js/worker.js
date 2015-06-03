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
			blur(pix) // TODO: add blur()
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

function grayscale(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		var grayscale = pix[i] * .33 + pix[i+1] * .59 + pix[i+2] * .11;
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

function blur(pix){
	for (var i = 0, n = pix.length; i < n; i += 4){
		pix[i] = pix[i];
		pix[i+1] = pix[i+1];
		pix[i+2] = pix[i+2];
	}
}