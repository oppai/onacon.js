var Onacon = null;

(function() {
  //オブジェクトコピー
  function copy(obj) {
    var hoge = function(){};
    hoge.prototype = obj;
    return hoge;
  }

  Onacon = function(){
    /* initialize */
    var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
    if(!gamepadSupportAvailable){
      console.log('error:Your browser is not supported. It use the GamePadAPI on Chrome and Firefox.');
      return;
    }

    /* calc fps */
    Onacon.fps_val = 0.0;
    var FPS = function (){
      var end = new Date();
      var diff = end.getTime() - FPS.start.getTime();
      FPS.start = end;
      Onacon.fps_val = Math.floor(100000/diff)/100;
    };
    FPS.start = new Date();

    /* create velocity instans */
    var pads_length = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()).length;
    Onacon.velocity = new Array(pads_length);
    for (var i = 0; i < pads_length; i++) {
      var calcVelocity = function (b){
        calcVelocity.insert_times.push( (calcVelocity.inserting && b == 0 )?1:0 );
        calcVelocity.inserting = ( b == 1 );
      };
      calcVelocity.v = function(){
        var limit = calcVelocity.insert_times.length - fps_val*3;
        var sum = 0;
        for (var j = calcVelocity.insert_times.length - 1; j >= limit; j--) {
          sum += calcVelocity.insert_times[j]
        };
        return Math.floor(10 * sum/3)/10;
      };
      calcVelocity.inserting = false;
      calcVelocity.insert_times = new Array();
      calcVelocity.timestamp = new Date();

      Onacon.velocity[i] = calcVelocity;
    }

    /* main loop */
    Onacon.pads = new Array();
    window.requestAnimationFrame(function runtimeLoop(){
        window.requestAnimationFrame(runtimeLoop);

        if(!Onacon.pausing){
          var gamepads = navigator.webkitGetGamepads && navigator.webkitGetGamepads();
          for (var i = 0; i < gamepads.length; i++) {
            Onacon.pads[i] = gamepads[i];
            if ( gamepads[i] ){
              Onacon.velocity[i]( Onacon.pads[i].buttons[0] );
            }
          };
          FPS();
        }
    });

    //calc timer
    Onacon.pausing = true;
    Onacon.total_time_sec = 0;
    setInterval(function(){
      if(!Onacon.pausing){
        Onacon.total_time_sec += 1;
      }
    },1000);
  };

  /* interface prototypes */
  Onacon.prototype = {
    onacons:function(){
      return Onacon.pads;
    },
    fps:function(){
      return Onacon.fps_val;
    },
    velocity:function(p){
      if(p!=null) return Onacon.velocity[p].v();

      var vels = new Array(Onacon.velocity.length);
      for (var i = 0; i < vels.length ; i++) {
        vels[i] = Onacon.velocity[i].v();
      }
      return vels;
    },
    start:function(){
      Onacon.pausing = false;
    },
    stop:function(){
      Onacon.pausing = true;
    },
    time:function(){
      return Onacon.total_time_sec;
    }
  };

})();