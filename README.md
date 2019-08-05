# quireMatrix
An easy to use, dependency-less software to visualize in the browser the layout
of quires, using a very intuitive notation system.

## Demo
A working demo is shipped within the project files (file docs/index.html). Download
and open in a web browser to test the software.

If you don't want to run your own copy a freely accessible demo is available
on our website at https://paths-erc.github.io/quireMatrix/

## Browser compatibility
Your favorite browser is the only software you need to run quireMatrix, which uses
the [`canvas` element](https://en.wikipedia.org/wiki/Canvas_element).

All modern browsers have a good support for the `canvas` element, but if you
want to make it will work on yours, [check here](http://caniuse.com/#feat=canvas).

## Usage
The software takes a formatted string describing the first (left) half of a
quire and uses it to reconstruct the second half. It then builds the matrix view.

1. Download from [Github](https://github.com/paths-erc/quireMatrix/archive/master.zip)

2. Require the library
```html
<script type="text/javascript" src="quireMatrix.js"></script>
```
  or use a CDN version

  ```html
<script type="text/javascript" src="//cdn.jsdelivr.net/gh/paths-erc/quireMatrix/quireMatrix.min.js"></script>
```

3. Create a new instance
```js
  var m = new Matrix('canvas');
```
where `canvas` is the `id` attribute of the canvas element, eg.

```html
<canvas id="canvas" width="400" height="50"></canvas>
```

4. Parse a string
```javascript
  m.parseString('string', 'second_half');
```
where `string` id the string to parse and `second_half` is the id of the element
that will contain the second part of the quire, eg:

```html
<input type="text" id="string">
<span id="second_half"></span>
```

5. Or add a listener to an input element to get data from user
```javascript
  m.observeInput('input', 'second_half');
```
where `input` id the `id` attribute of the input element (it can be a `textarea`,
`input`, etc.).

5. Done!

### Full example
A full working example can be found in the [demo/index.html file](https://github.com/paths-erc/quireMatrix/blob/master/docs/index.html). A minimal,
working example of both the HTML and JS code needed to get a working environment:

```html
<!-- Input element -->
<input type="text" id="input">

<!-- container of reconstructed second-half data -->
<div id="second_half"></div>

<!-- Canvas element -->
<canvas id="canvas" width="400" height="50"></canvas>

<!-- Include script -->
<script type="text/javascript" src="quireMatrix.js"></script>

<!-- Run script -->
<script type="text/javascript" ></script>
  var m = new Matrix('canvas');
  m.observeInput('input', 'second_half');
</script>
```

Check also our working demo on  [GitHub Pages](https://paths-erc.github.io/quireMatrix/)

## API
**quireMatrix** has only three public methods
- Matrix.`clear`: clears the canvas
- Matrix.`parseString`(val, secondHalfId): parses the notated string passed in `val`
and puts the reconstructed (right) half in right half element passed as id (string)
or as jQuery element in `secondHalfId`.
- Matrix.`observeInput`(inputId, secondHalfId): sets an observer on `inputId` element
passed as id (string) or as jQuery element.

## Notation system
**quireMatrix** uses a very simple notation system to describe
*the first half* of a quire, that will be used to infer the second (specular) half structure.

Pages should be separated by a **forward slash** (/). Each page **must** be describes
by one of the following:

- `0` (infers on right `1`) left: nothing; right: singleton
- `1` (infers on right `0`) left: singleton; right: nothing
- `0*` (infers on right `1*`) left: lost singleton (dashed line); right: singleton
- `1*` (infers on right `0*`) left: singleton; right: lost singleton (dashed line)
- `1x*` (infers on right `1x*`) lost union (dashed line)
- `0+` (infers on right `1+`) left: stub; right: singleton
- `1+` (infers on right `0+`) left: singleton; right: stub
- `0+*` (infers on right `1+*`) left: lost stub; right: lost singleton
- `1+*` (infers on right `0+*`) left: lost singleton; right: lost stub
- `1x` (infers on right `1x`) union, ie. left: singleton; right: singleton
- `2` (infers on right `0`) union on the left side; right: nothing
- `2*` (infers on right `0`) lost union on the left side (dashed); right: nothing
- `3` (infers on right `0`) union and singleton on the left side; right: nothing
- `3*` (infers on right `0`) lost union and singleton on the left side (dashed); right: nothing
- `4` (infers on right `0`) two union on the left side; right: nothing
- `4*` (infers on right `0`) two lost union on the left side (dashed); right: nothing

### Notation example
The notation syntax describes the left half of the quire and contains information
useful to reconstruct the second part of it. Its if formed by several elements
divided by **forward slashes** (**/**). Each element describes a leaf/layer and is
formed by a number (1, 2, 3 or 4) that indicates the leaf on the left side followed
by one or many indicators, that tell more about its conservation, consistency
and correspondence to the right side. The available indicators are:
- `x`, to be used only with number `1`, indicating perfect correspondence on both
sides of the quire
- `*` indicates that the leaf is not preserved, but that we have decisive clues
that it existed
- `+`, indicates that on the other side of the leaf only a stub is visible
Left (user input): `1x/1*/1/1x/1x/0+/1x*` infers on right side: `1x*/1+/1x/1*/1/1x/1x`.
The inferred right side will have a reversed order if compared to the left half.
This is easily explained by considering that the overall descriptions follows a
clockwise direction or reading order.

Verbose description:
- `1` - `1` singleton on left side
- `1x` - `1x` binion
- `1*` - `0*` binion with right page lost
- `1+` - `0+` singleton on left side with stub on right side
- `1x*` - `1x*` lost binion
- `1+*` - `0+*` lost singleton with stub

# How to cite
This software is archived in Zenodo. Please cite it by referring the DOI: [10.5281/zenodo.1453362](https://doi.org/10.5281/zenodo.1453362)

[![DOI](https://zenodo.org/badge/95661162.svg)](https://zenodo.org/badge/latestdoi/95661162)


# License
MIT License. See [LICENSE](LICENSE) file

# Copyright
Copyright (c) 2017 Julian Bogdani, PAThs
