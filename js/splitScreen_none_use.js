var sidebar = document.getElementById("sidebar");
var container = document.querySelector(".container");

window.onload = function(){
	console.log("splitScreen.js loaded")
	//console.log(sidebar.offsetWidth);
	//console.log(container.offsetWidth);
	container.offsetWidth = window.innerWidth - sidebar.offsetWidth;
	//console.log(container_block.offsetWidth);
	//console.log(container_block_right.offsetWidth)
}

window.addEventListener("resize", function(){
	//console.log(window.innerWidth);
	container.offsetWidth = window.innerWidth - sidebar.offsetWidth;
})