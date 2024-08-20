var timerID=null;
var interval=100;

self.onmessage=function(e){// eslint-disable-line no-restricted-globals
	if (e.data==="start") {
		timerID=setInterval(function(){postMessage("tick");},interval)
	}
	else if (e.data.interval) {
		interval=e.data.interval;
		if (timerID) {
			clearInterval(timerID);
			timerID=setInterval(function(){postMessage("tick");},interval)
		}
	}
	else if (e.data==="stop") {
		if(timerID!=null)clearInterval(timerID);
		timerID=null;
	}
};

postMessage('hi there');