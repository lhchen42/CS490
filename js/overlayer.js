var btn = document.getElementById("backBtn");

btn.addEventListener("click", hide_layer)

function hide_layer(){
	//console.log("hide");
	document.getElementById("screen").style.display = "none";
}


var d = document.getElementById("popdiv");

var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var dWidth = d.offsetWidth;
var dHeight = d.offsetHeight;
		
d.style.top = (wHeight / 2) - (dHeight / 2) + "px";
d.style.left = (wWidth / 2) - (dWidth / 2) + "px";

function pop_overlayer(msg){
	document.getElementById("screen").style.display = "block";
	set_pop_message(msg);
}

function set_pop_message(msg){
	document.getElementById("pop_message").innerHTML = msg;
}