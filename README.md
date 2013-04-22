Onacon.js
=============

This is controller on the javascript.

+ Using GamePadAPI


ScreenShot
-------------
![Alt text](https://github.com/oppai/onacon.js/blob/master/ss1.png?raw=true "Screen Capture1")

Browser
-------------
+ Chrome / FireFox

Demo site
-------------
+ [ONACOUNTER on the web](http://mangate.net/onacon/)

Sample code 
-------------
	// onacon instance
	var onacon = new Onacon();
	
	// start measuring
	onacon.start();
	
	// (navigator.webkitGetGamepads && navigator.webkitGetGamepads())[i]
	onacon.onacons(i);
	
	// fps
	onacon.fps();
	
	// velocity of i
	onacon.velocity(i);
	
	// all velocities
	onacon.velocity();
	
	// array of strokes 
	onacon.allStrokes();
	
	// measuring time
	onacon.allStrokes();
	
	// setting shoot method foe gamepad[i]
	onacon.shoot(i,function(){
		// do something
	});

	// stop measuring
	onacon.stop();

Also see
-------------
+ [暇人＼(^o^)／速報 : USBオナホール届いたからオナニー計測ソフト作った - ライブドアブログ](http://himasoku.com/archives/51696310.html)