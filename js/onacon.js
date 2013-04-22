var Onacon = null;

(function() {
  Onacon = function(){
    /* initialize */
    var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
    if(!gamepadSupportAvailable){
      console.log('error:Your browser is not supported. It use the GamePadAPI on Chrome and Firefox.');
      return;
    }
    var pads_length = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()).length;

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
    Onacon.velocity = new Array(pads_length);
    for (var i = 0; i < pads_length; i++) {
      var calcVelocity = function(){
        this.inserting = false;
        this.insert_times = new Array();
        this.timestamp = new Date();
      };
      calcVelocity.prototype.calc = function (b){
        this.insert_times.push( (this.inserting && b == 0 )?1:0 );
        this.inserting = ( b == 1 );
      };
      calcVelocity.prototype.v = function(){
        var limit = this.insert_times.length - Onacon.fps_val*3;
        var sum = 0;
        for (var j = this.insert_times.length - 1; limit > 0 && j >= limit; j--) {
          sum += this.insert_times[j]
        };
        return Math.floor(10 * sum/3)/10;
      };

      Onacon.velocity[i] = new calcVelocity();
    }

    /* main loop */
    Onacon.shoot = new Array(pads_length);
    for (var i = 0; i < pads_length; i++) {
      Onacon.shoot[i] = function(){};
    }

    /* main loop */
    Onacon.pads = new Array(pads_length);
    window.requestAnimationFrame(function runtimeLoop(){
        window.requestAnimationFrame(runtimeLoop);

        if(!Onacon.pausing){
          var gamepads = navigator.webkitGetGamepads && navigator.webkitGetGamepads();
          for (var i = 0; i < gamepads.length; i++) {
            Onacon.pads[i] = gamepads[i];
            if ( gamepads[i] ){
              Onacon.velocity[i].calc( Onacon.pads[i].buttons[0] );

              if(Onacon.pads[i].buttons[1]){
                Onacon.shoot[i]();
              }
            }
          };
          FPS();
        }
    });

    /* calc timer */
    Onacon.pausing = true;
    Onacon.total_time_sec = 0;
    setInterval(function(){
      if(!Onacon.pausing){
        Onacon.total_time_sec += 1;
      }
    },1000);
  };

  /* prototype interface */
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
    shoot:function(i,f){
      Onacon.shoot[i] = f;
    },
    time:function(){
      return Onacon.total_time_sec;
    }
  };

})();