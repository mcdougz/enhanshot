# About

## What and Why

Enhanshot.js is a javascript library for enhancing images with lightweight and easy way. So far there is only one action for enhancing image, I am going to add many enhance functions as well as Instagram or Tumblr.


## Sample

[Enhanshot.js Sample Page](http://KENJU.github.io/enhanshot)

# Install

## Download ZIP file

Download [ZIP file](https://github.com/KENJU/enhanshot/archive/master.zip) and archive it. The only thing you need is **files in dist folder**.

## Clonde Github repository

Or, clone in your local repository.

```bash
$ git clone https://github.com/KENJU/enhanshot.git
$ cd enhanshot
```

# Usage

## 1. Import Script Files

There are three files in [dist](https://github.com/KENJU/enhanshot/tree/master/dist) folder. Download all of them and import.

- jquery.min.js(if you have not yet load jquery in your project)
- enhanshot.min.js
- worker.min.js

```html

<script src="dist/jquery.min.js"></script>
<script src="dist/enhanshot.min.js"></script>

```

You do not have to load `dist/worker.min.js` because enhanshot.min.js load this file.

## 2. Select Effect

Firstly, just add `class="convert-img"` to image tags which you want to enhance.

And then, please add `data-effect="???"` attribute to the same img tag.

```html

<img src="img/food1.jpg" alt="" data-effect="enhance" class="convert-img">

```

### Available Effects
#### enhance
Basic enhancement for all images from foods, portraits to natures.

#### grayscale
Coming soon...

#### sepia
Coming soon...

#### Negative-Positive
Coming soon...

#### Blur
Coming soon...


## 3. Call `process(img)` function

### Default

In default, any elements whose id name is `convertBtn` would trigger convert action. Therefore, add `<button>` or `<a>` with id name `converBtn`.

```html

<button id="convertBtn">Convert!</button>	


```

```js

$('#convertBtn').on('click', function(e){
	Array.prototype.forEach.call(document.querySelectorAll('.row-right img'), function(node){
		process(node);
	});
});

```

### Customize

Call `process(img)` function.

```js
var img = $('#convert-target');
process(img);

```

# FAQ

### Q. It's HEAVY plugin, ha?
### A. No, Enhanshot.js uses Web Workers API

Usually, some processing about images or photos could be heavy and memory-consuming process, and such heavy plugin could lower the usability of clients sides.

However, thanks to [Web Worker API](https://developer.mozilla.org/ja/docs/Web/API/Worker), a heavy converting process is done under background, therefore it does not cost too much on user experiences.

# Copyright and license
Code and documentation copyright Kenju Wagatsuma. Code released under [the MIT license](https://github.com/KENJU/enhanshot/blob/master/LICENSE)