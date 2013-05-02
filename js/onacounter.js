var onacon = new Onacon();
onacon.start();

$(function(){
  $('#download').click(function(){
      var blob = new Blob([onacon.allStrokes(0).toString()]);
      var url = window.URL || window.webkitURL;
      var blobURL = url.createObjectURL(blob);
      var a = document.createElement('a');
      a.download = 'data.csv';
      a.href = blobURL;
      a.click();
  });
});

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
    title: 'Your Stroke Velocity.',
    hAxis: {title: 'Velocity of Stroke',  titleTextStyle: {color: 'red'}}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  setInterval(function(){
    var i = data.addRow([(++p/10)+'',onacon.velocity(0)]);
    if(i > 200) data.removeRow(0);
    chart.draw(data, options);
  }, 100);
}