//$(function(){
  var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
  if(!gamepadSupportAvailable){
    alert('Your browser is not supported. It use the GamePadAPI on Chrome and Firefox.');
    return;
  }

  var fps_val = 0.0;
  function FPS(){
    var end = new Date();
    var diff = end.getTime() - FPS.start.getTime();
    FPS.start = end;
    fps_val = Math.floor(100000/diff)/100;
  }
  FPS.start = new Date()

  //calc velocity
  function calcVelocity(b){
    calcVelocity.insert_times.push( (calcVelocity.inserting && b == 0 )?1:0 );
    calcVelocity.inserting = ( b == 1 );
  }
  calcVelocity.v = function(){
    var limit = calcVelocity.insert_times.length - fps_val*3;
    var sum = 0;
    for (var i = calcVelocity.insert_times.length - 1; i >= limit; i--) {
      sum += calcVelocity.insert_times[i]
    };
    return Math.floor(10 * sum/3)/10;
  }
  calcVelocity.inserting = false;
  calcVelocity.insert_times = new Array();
  calcVelocity.timestamp = new Date();

  //main loop
  function runAnimation()
  {
      window.requestAnimationFrame(runAnimation);

      var gamepads = navigator.webkitGetGamepads && navigator.webkitGetGamepads();
      var pad = gamepads[0];

      if(pad.buttons){
        $('span#buttons').text(pad.buttons);
        calcVelocity(pad.buttons[0]);
      }

      FPS();
  }

  //show velocity
  setInterval(function(){
    $('span#vel').text(calcVelocity.v());
  },100);

  //show fps
  setInterval(function(){
    $('span#fps').text(fps_val);
  },500);

  //show timer
  setInterval(function(){
    var time = Math.floor(((new Date()).getTime() - calcVelocity.timestamp.getTime())/1000);
    $('span#total_time').text(time);
  },1000);

  window.requestAnimationFrame(runAnimation);

  google.load('visualization', '1', {packages:['gauge']});
  google.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Speed', 0]
    ]);

    var options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom:75, yellowTo: 90,
      minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);

    setInterval(function(){
      var v = 20 * calcVelocity.v();
      data.setValue(0, 1, v?Math.min(v,100):0);
      chart.draw(data, options);
    }, 100);
  }