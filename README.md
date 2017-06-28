# quireMatrix
An easy to use, dependency-less software to visualize in the browser the layout
of quires, using a very intuitive notation system.

## Usage
The software takes a formatted string describing the first (left) half of a
quire and uses it to reconstruct the second half. It then builds the matrix view.

1. Require the library
        <script type="text/javascript" src="quireMatrix.js"></script>

2. Create a new instance
        <script type="text/javascript">
          var m = new Matrix('canvas');
where `canvas` is the `id` attribute of the canvas element

3. Add a listener to an input element to get data from user
        m.observeInput('input', 'second_half');
where `input` id the `id` attribute of the input element (it can be a `textarea`,
`input`, etc.).

4. Done!

## Full example
A full working example can be found in the test.html file. A minimal,
working example of both the HTML and JS code needed to get a working environment:

    <!-- Input element -->
    <input type="text" id="input">
    <!-- container of reconstructed second-half data -->
    <div id="second_half"></div>
    <!-- Canvas element -->
    <canvas id="canvas" width="400" height="300"></canvas>
    <!-- Include script -->
    <script type="text/javascript" src="quireMatrix.js"></script>');
    <!-- Run script -->
    <script type="text/javascript" ></script>');
      var m = new Matrix('canvas');
      m.observeInput('input', 'second_half');
    </script>

## Notation system
**quireMatrix** uses a very simple notation system to describe
*the first half* of a quire, that will be used to infer the second (specular) half structure.

Pages should be separated by a **forward slash** (/). Each page **must** be describes
by one of the following:

- `0` (infers on right `1`) left: nothing; right: singleton
- `1` (infers on right `0`) left: singleton; right: nothing
- `0*` (infers on right `1*`) left: lost singleton (dashed line); right: singleton
- `1*` (infers on right `0*`) left: singleton; right: lost singleton (dashed line)
- `0+` (infers on right `1+`) left: stub; right: singleton
- `1+` (infers on right `0+`) left: singleton; right: stub
- `1x` (infers on right `1x`) union, ie. left: singleton; right: singleton
- `2` (infers on right `0`) union on the left side; right: nothing
- `2*` (infers on right `0`) lost union on the left side (dashed); right: nothing
- `3` (infers on right `0`) union and singleton on the left side; right: nothing
- `3*` (infers on right `0`) lost union and singleton on the left side (dashed); right: nothing
- `4` (infers on right `0`) two union on the left side; right: nothing
- `4*` (infers on right `0`) two lost union on the left side (dashed); right: nothing

### Notation example

Left (user input): `1x/1*/1/1x/1x/0+` infers on right side: `1+/1x/1*/1/1x/1x`.
The inferred right side will have a reversed order if compared to the left half.
This is easily explained by considering that the overall descriptions follows a
clockwise direction.

Verbose description:
1. binion
2. binion with right page lost
3. singleton on left side
4. binion
5. binion
6. stub on left side with singleton on right side

## License
MIT License. See LICENSE file

## Copyright
Copyright (c) 2017 paths-erc
