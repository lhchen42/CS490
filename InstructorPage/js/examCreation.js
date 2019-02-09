var questionList = [];
var qlast = document.querySelector("#questionBank tbody tr");
var elast = document.querySelector("#examQuestion tbody tr");

window.onload = function(){
	getQuestion();
	//console.log(uidGenerator());
	questionBankRowEvents();

}

function getQuestion(){
	var stdRequest = {
		act: "getQuestions"
	}
	request(stdRequest, buildTable, false);
}

function questionBankRowEvents(){
	var qust = document.querySelector("#questionBank");
	//console.log(qust.rows);
	for(var i=0, row; row=qust.rows[i]; i++){
		//console.log(row);
		row.addEventListener("mouseover", highlightRow);
		row.addEventListener("mouseout", dehighlightRow);
		row.addEventListener("click", addToExam);
	}
}

function highlightRow(){
	if(this.className == ""){
		this.className="highlight";
	}
}

function dehighlightRow(){
	if(this.className == "highlight"){
		this.className="";
	}
}


var dict = new Object();
function addToExam(){
	//console.log(this);
	var exam = document.querySelector("#examQuestion tbody");
	this.removeEventListener("click", addToExam);
	this.classList.remove("highlight");

	//Make a copy of the row;
	var clone = this.cloneNode(true);

	//Create two more columne for question score and remove btn
	var colScore = document.createElement("td");
	var colRemove = document.createElement("td");

	colScore.appendChild(questionScore());

	var revBtn = removeButton();
	revBtn.addEventListener("click", removeFromExam);
	colRemove.appendChild(revBtn);

	clone.appendChild(colScore);
	clone.appendChild(colRemove);

	exam.insertBefore(clone, elast);

	//Pair up the clone and original in question bank with id.
	dict[clone.children[0].innerHTML] = this;

	//Change the color of added question
	this.style.background = "grey";
}

function removeFromExam(){
	//Remove a row form exam table
	var row = this.parentNode.parentNode;
	dict[row.children[0].innerHTML].addEventListener("click", addToExam);
	dict[row.children[0].innerHTML].removeAttribute("style");
	delete dict[row.children[0].innerHTML];
	row.remove();
}

function questionScore(){
	var score = document.createElement("input");
	score.setAttribute("type", "number");
	score.classList.add("score");
	score.classList.add("stdNumberInput");
	score.required = true;
	return score;
}

function removeButton(){
	var revBtn = document.createElement("button");
	revBtn.classList.add("stdButton");
	revBtn.setAttribute("type", "button");
	revBtn.innerHTML = "Remove";
	return revBtn;
}


var createBtn = document.getElementById("create");
createBtn.addEventListener("click", function(){
	//console.log(exam.children.length);
	//---------------Form validating-------------------
	var exam = document.querySelector("#examQuestion tbody");
	if(exam.children.length == 1){
		pop_overlayer("No question was been add");
		return;
	}
	if(!(/\S/.test(document.getElementById("examName").value))){
		pop_overlayer("Please giving a name for the Exam.");
		return;
	}
	var scores = document.getElementsByClassName("score");
	for(var i =0; i<scores.length; i++){
		console.log(scores[i].value);
		if(!(/\S/.test(scores[i].value))){
			pop_overlayer("Please make sure each question has point.");
			return;
		}
	}
	//--------------------------------------------------


	for(var i=0; i<exam.children.length-1; i++){ //exclue last row which is a filler
		console.log(exam.children[i].childNodes[0].textContent);
		questionList.push(exam.children[i].childNodes[0]);
	} 

	var uid = uidGenerator();
	
	var stdRequest = {
		act: "addExam",
		name: document.getElementById("examName").value,
		id: uid
	}

	for(var i=0; i<questionList.length; i++){
		stdRequest["Q"+(i+1)] = questionList[i].textContent;
		stdRequest["P"+(i+1)] = scores[i].value;
	}
	console.log(stdRequest);
	pop_overlayer("uploading...");
	document.getElementById("backBtn").disabled = true;
	request(stdRequest, setExam);
	
})

function setExam(response){
	console.log(response);
	var json = JSON.parse(response);

	if(json.addExam == "true"){
		document.getElementById("pop_message").innerHTML = "Success!";
		setExamSuccess()
	}
	else{
		document.getElementById("pop_message").innerHTML = "Fail! Try Again.";
	}
	document.getElementById("backBtn").disabled = false;
}

function setExamSuccess(){
	for(var i=0; i<questionList.length; i++){
		questionList[i].parentNode.parentNode.removeChild(questionList[i].parentNode);
		delete questionList[i];
	}
	document.getElementById("examName").value = "";
}

function uidGenerator(){
	//8 digit unique value
	return Math.floor(1+Math.random()*0x100000000);
}
