/**
 * [description]
 * @param  {string|object} canvasId Id of canvas element where to draw the matrix or jQuery object of the element
 */
var Matrix = function(canvasId){

  var version = "1.0.0";

  var canvas = (typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId[0]),
      ctx = canvas.getContext("2d"),
      height = canvas.height,
      width = canvas.width,
      step = 20,
      rows = 1,
      values_map = {
        '0': '1',
        '1': '0',

        '0*': '1*',
        '1*': '0*',

        '0+': '1+',
        '1+': '0+',

        '1x': '1x',

        '2': '0',
        '2*': '0',

        '3': '0',
        '3*': '0',

        '4': '0',
        '4*': '0'
      };

  ctx.lineWidth = 1.5;

  /**
   * Draws a single line but does not render
   */
  function single(){
    ctx.moveTo(0, height-(rows*step));
    ctx.lineTo((width/2), height-((rows-1)*step));
  }

  /**
   * Draws a single line renders it
   */
  function addOne(){
    ctx.beginPath();
    single();
    ctx.stroke();
  }

  /**
   * Draws input: 0
   *    left: nothing
   *    right: single
   */
  function addZero(){
    ctx.beginPath();
    ctx.moveTo((width/2), height-((rows-1)*step));
    ctx.lineTo(width, height-(step*rows));
    ctx.stroke();
  }

  /**
   * Draws input: 0+
   *  left: stub
   *  right: single
   */
  function addZeroPlus(){
    ctx.beginPath();
    ctx.moveTo(width, height-(rows*step));
    ctx.lineTo((width/2), height-((rows-1)*step));
    ctx.lineTo((width/2)-(width/10), height-(rows*step)+step*0.75);
    ctx.stroke();
  }

  /**
   * Draws input: 0*
   *  left: single dashed
   *  right: single
   */
  function addZeroDash(){
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(0, height-(rows*step));
    ctx.lineTo((width/2), height-((rows-1)*step));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo((width/2), height-((rows-1)*step));
    ctx.lineTo(width, height-(step*rows));
    ctx.stroke();
  }

  /**
   * Draws input: 1+
   *  left: single
   *  right: stub
   */
  function addOnePlus(){
    ctx.beginPath();
    single();
    ctx.lineTo((width/2)+(width/10), height-(rows*step)+step*0.75);
    ctx.stroke();
  }

  /**
   * Draws input: 1x
   *  left: single
   *  right: single
   */
  function addOnePer(){
    ctx.beginPath();
    single();
    ctx.lineTo(width, height-(step*rows));
    ctx.stroke();
  }

  /**
   * Draws input: 1x*
   *  left: single dashed
   *  right: single dashed
   */
  function addOnePerDash(){
    ctx.beginPath();
    ctx.setLineDash([5]);
    single();
    ctx.lineTo(width, height-(step*rows));
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /**
   * Draws input: 1*
   *  left: single
   *  right: single dashed
   */
  function addOneDash(){
    ctx.beginPath();
    ctx.moveTo(0, height-(rows*step));
    ctx.lineTo((width/2), height-((rows-1)*step));
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo((width/2), height-((rows-1)*step));
    ctx.lineTo(width, height-(step*rows));
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /**
   * Draws input: 2 and 2*
   *  left: 2 singles (dashed)
   *  right: -
   */
  function addTwo(dash){
    ctx.beginPath();
    if (dash){
      ctx.setLineDash([5]);
    }
    single();
    ctx.lineTo(0, height-(rows*step)-(step/2));
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /**
   * Draws input: 3 and 3*
   *  left: 3 singles (dashed)
   *  right: -
   */
  function addThree(dash){
    ctx.beginPath();
    if (dash){
      ctx.setLineDash([5]);
    }
    single();
    ctx.lineTo(0, height-(rows*step)-(step/3));
    ctx.stroke();
    ctx.moveTo((width/2), height-((rows-1)*step));
    ctx.lineTo(0, height-(rows*step)-step*2/3);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /**
   * Draws input: 4 and 4*
   *  left: 4 singles (dashed)
   *  right: -
   */
  function addFour(dash){
    ctx.beginPath();
    if (dash){
      ctx.setLineDash([5]);
    }
    single();
    ctx.lineTo(0, height-(rows*step)-(step/4));
    ctx.stroke();
    ctx.moveTo((width/2), height-((rows-1)*step));
    ctx.lineTo(0, height-(rows*step)-step*2/4);
    ctx.stroke();
    ctx.moveTo((width/2), height-((rows-1)*step));
    ctx.lineTo(0, height-(rows*step)-step*3/4);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /**
   * Utility function to add listener to element
   * From: https://stackoverflow.com/a/24173176/586449
   * @param {object} elem      element to observe
   * @param {string} eventType event to listen to
   * @param {function} handler   callback to run
   */
  function addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener){
      elem.addEventListener (eventType, handler, false);
    } else if (elem.attachEvent) {
      elem.attachEvent ('on' + eventType, handler);
    }
}

  /**
   * Draws a row on canvas
   * @param  {string} type Input value describing row
   */
  this.addRow = function(type){
    if (type === '1')         addOne();
    else if (type === '1+')   addOnePlus();
    else if (type === '1x')   addOnePer();
    else if (type === '1x*')  addOnePerDash();
    else if (type === '1*')   addOneDash();
    else if (type === '0')    addZero();
    else if (type === '0*')   addZeroDash();
    else if (type === '0+')   addZeroPlus();
    else if (type === '2')    addTwo();
    else if (type === '2*')   addTwo(true);
    else if (type === '3')    addThree();
    else if (type === '3*')   addThree(true);
    else if (type === '4')    addFour();
    else if (type === '4*')   addFour(true);
    rows++;
  };

  /**
   * Clears canvas
   */
  this.clear = function(){
    rows = 1;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
  };

  /**
   * Parses a string and outputs martix on canvas and second-half result in second half container
   * @param  {string} val String to be parsed
   * @param  {string|object} secondHalfId  Id of element or jQuery object where to put the seconf half reconstruction
   */
  this.parseString = function(val, secondHalfId){
    var $this = this,
        secondHalf = secondHalfId ? (typeof secondHalfId === 'string' ? document.getElementById(secondHalfId) : secondHalfId[0]) : false,
        tot = 0,
        a = [];

    // clear canvas
    $this.clear();


    if (!val || val === '') return '';

    var val_arr = val.replace(/\/$/, '').split('/');

    if (val_arr.length > 3) {
      height = 50 + (val_arr.length*step);
      canvas.setAttribute('height', height);
    }

    // Draw on canvas
    val_arr.forEach(function(e){
      if (e){
        if (e !== '1x*') {
          tot += parseInt(e.replace('*', '').replace('x', ''));
        }
        $this.addRow(e);
      }
    });

    // Format second half text
    var val_arr_rev = val_arr.reverse();
    val_arr_rev.forEach(function(e, i, a){
      if (typeof values_map[e] !== 'undefined'){
        a[i] = values_map[e];
      }
      if (e && a[i] !== '1x*'){
        var nr = a[i] ? parseInt(a[i].replace('*', '').replace('x', '')) : 0;
        tot += (isNaN(nr) ? 0 : nr);
      }
    });

    var res = {
      text: val_arr_rev.join('/'),
      tot: tot*2
    };

    if (secondHalf) {
      secondHalf.innerHTML = '';
      secondHalf.innerHTML = '<code><strong>' + res.text + '</strong></code><br>Total: <strong>' + res.tot + '</strong> pages';
    } else {
      console.log(res);
    }

    return res;
  };

  /**
   * Observes input, parses its value on each input and writes results
   * to canvas and second half element, if available, otherwise logs it.
   * @param  {string} inputId Input element to observe
   * @param  {string} secondHalfId  Id of element where to put the seconf half reconstruction
   */
  this.observeInput = function(inputId, secondHalfId){
    var input = ( typeof inputId === 'string' ? document.getElementById(inputId) : inputId[0]),
        $this = this;

    $this.parseString(input.value, secondHalfId);

    addEventHandler(input, 'input', function(){
      $this.parseString(input.value, secondHalfId);
    });
  };

};
