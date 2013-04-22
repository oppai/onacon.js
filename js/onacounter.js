var onacon = new Onacon();
onacon.start();

//show velocity
setInterval(function(){
  $('span#buttons').text(onacon.onacons()[0].buttons);
  $('span#vel').text(onacon.velocity(0));
},100);

//show fps
setInterval(function(){
  $('span#fps').text(onacon.fps());
},500);

//show timer
setInterval(function(){
  $('span#total_time').text(onacon.time());
},1000);

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
    var v = 20 * onacon.velocity(0);
    data.setValue(0, 1, v?Math.min(v,100):0);
    chart.draw(data, options);
  }, 100);
}