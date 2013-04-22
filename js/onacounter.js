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

var p = 0;
google.load('visualization', '1', {packages:['corechart']});
google.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Time(sec)', 'times/sec'],
    ['0.0',  0]
  ]);

  var options = {
    title: 'Your Masterbation Velocity.',
    hAxis: {title: 'Velocity of Masterbation',  titleTextStyle: {color: 'red'}}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  setInterval(function(){
    data.addRow([(++p/10)+'',onacon.velocity(0)]);
    chart.draw(data, options);
  }, 100);
}