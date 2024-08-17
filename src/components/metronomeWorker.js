var timerID=null;
var interval=100;

self.onmessage=function(e){// eslint-disable-line no-restricted-globals
	if (e.data==="start") {
		console.log("starting");
		timerID=setInterval(function(){postMessage("tick");},interval)
	}
	else if (e.data.interval) {
		console.log("setting interval");
		interval=e.data.interval;
		console.log("interval="+interval);
		if (timerID) {
			clearInterval(timerID);
			timerID=setInterval(function(){postMessage("tick");},interval)
		}
	}
	else if (e.data==="stop") {
		console.log("stopping");
		if(timerID!=null)clearInterval(timerID);
		timerID=null;
	}
};

postMessage('hi there');