var template = '<div id="loadingBg" style="background-color: #FFF; position: absolute; z-index: 99; width: 100%; height: 100%"><canvas id="mask" width="600" height="700"></canvas></div>';
var page;
var tid = null;
var ogg = {myProp:0};

$(document).ready(function(){
	getPage();
  	init();
});

$(window).resize(function(){
	getPage();
});

function getPage(){
	page = {
		h: window.innerHeight,
		w: $("body").innerWidth()
	};
}

function init(){
	TweenLite.set("#loadingBg", { y: $("body").scrollTop(), backgroundColor: "transparent" });
	TweenLite.to(ogg, 1.5, {myProp: page.w, onComplete: removeMask, ease: Power4.easeIn, onUpdate: initMask});
}

function initMask(){
	$("#loadingBg canvas").attr({width: page.w, height: page.h});
	var masks = document.getElementById("mask");
	var cx = masks.getContext("2d");
	cx.beginPath();
	cx.rect(0,0,page.w,page.h);
	cx.arc(page.w*0.5,page.h*0.5,ogg.myProp,0,2*Math.PI, true);
	cx.fillStyle =  "#FFF";
	cx.fill();
}

function removeMask(){
	$("#loadingBg").remove();
}

