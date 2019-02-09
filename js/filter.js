var categoryInput = document.querySelector("#filters input[name='category']");
var difficultyInput = document.querySelector("#filters input[name='difficulty']");
var keywordInput = document.querySelector("#filters input[name='keyword']");


function printFilterSection(){
	console.log(categoryInput);
	console.log(difficultyInput);
	console.log(keywordInput);
}

categoryInput.addEventListener("input", function(){
	//console.log(categoryInput.value);
	var questionBank = document.getElementById("questionBankBody").childNodes;
	//console.log(questionBank);
	for(var i=0; i<questionBank.length-1; i++){
		console.log(questionBank[i].childNodes[2].innerHTML);
		if(!questionBank[i].childNodes[2].innerHTML.includes(categoryInput.value)){
			questionBank[i].style.display = "none";
		}
		else{
			questionBank[i].removeAttribute("style");
		}
	}

	//console.log(questionBank);
})

difficultyInput.addEventListener("input", function(){
	var questionBank = document.getElementById("questionBankBody").childNodes;
	for(var i=0; i<questionBank.length-1; i++){
		if(!questionBank[i].childNodes[3].innerHTML.includes(difficultyInput.value)){
			questionBank[i].style.display = "none";
		}
		else{
			questionBank[i].removeAttribute("style");
		}
	}

})

keywordInput.addEventListener("input", function(){
	//console.log(keywordInput.value);
	var questionBank = document.getElementById("questionBankBody").childNodes;
	for(var i=0; i<questionBank.length-1; i++){
		console.log(questionBank[i].childNodes[2].innerHTML);
		if(!questionBank[i].childNodes[1].innerHTML.includes(keywordInput.value)){
			questionBank[i].style.display = "none";
		}
		else{
			questionBank[i].removeAttribute("style");
		}
	}

})