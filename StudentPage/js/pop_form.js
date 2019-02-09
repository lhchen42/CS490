var btn1 = document.getElementById("checkBtn");
var btn2 = document.getElementById("backBtn");

btn1.addEventListener("click", function(){
	console.log("show");
	document.getElementById("screen").style.display = "block";
})

btn2.addEventListener("click", function(){
	console.log("hide");
	document.getElementById("screen").style.display = "none";
})


var d = document.getElementById("popdiv");

var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var dWidth = d.offsetWidth;
var dHeight = d.offsetHeight;
		
d.style.top = (wHeight / 2) - (dHeight / 2) + "px";
d.style.left = (wWidth / 2) - (dWidth / 2) + "px";

