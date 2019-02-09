var examid = "";
var questionJSON;
var pointsJSON;
var list = [];
var counter = 0;

function submitAns(req, callback){
  	var url = "../php/submitAns.php";
	var xhttp = new XMLHttpRequest();

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this);
      callback(this.responseText);
    }
	};
	var jsonFormat = JSON.stringify(req);
	xhttp.send(jsonFormat);
}


window.onload = function(){
	//console.log("PageLoad");
	document.getElementById("title").innerHTML = sessionStorage.getItem("examName");
	document.body.classList.add("stdBackground");
	var usr = sessionStorage.getItem("usr");
	var stdRequest = {
		act: "getStudExam",
		user: usr
	}
	console.log(stdRequest);
	request(stdRequest, getExam);
}

function getExam(respones){
	console.log(respones);
	var id = JSON.parse(respones).getStudExam;
	examid = id;
	//console.log(id);
	var stdRequest = {
		act: "getQuestionsExam",
		exam: id
	}
	console.log(stdRequest);
	request(stdRequest, getQuestions);
}

function getQuestionsPoints(){
	//console.log(response);
	var stdRequest = {
		act: "getPointsExam",
		exam: examid
	}
	console.log(stdRequest);
	request(stdRequest, getPoints);
}

function getPoints(response){
	console.log(response);
	pointsJSON = JSON.parse(response);
	
	buildExam()

}

function getQuestions(response){
	console.log(response);
	var text = response.slice(0, -1);
	text = "[" + text + "]";
	
	questionJSON = JSON.parse(text);

	getQuestionsPoints();
	//buildExam(json);
}

function buildExam(){
	var examArea = document.getElementById("exam");
	console.log(questionJSON);
	for(var i =0; i<questionJSON.length; i++){
		if(questionJSON[i].id == "0"){
			continue;
		}
		var question = buildQuestion(questionJSON[i]);
		var div = document.createElement("div");
		div.className = (questionJSON[i].id);

		var p = document.createElement("p");
		//var span = document.createElement("span");
		//span.classList.add("score");
		//span.innerHTML = "(pt. "+pointsJSON["p"+(i+1)] + ").";
		p.innerHTML = question + "(pt. " + "<span>" +pointsJSON["p"+(i+1)] + "</span>" + ").";
		//console.log(p);

		var textArea = document.createElement("textarea");
		textArea.rows = "20";
		textArea.cols = "100";
		textArea.classList.add("stdTextArea");

		div.appendChild(p);
		div.appendChild(textArea);
		examArea.appendChild(div);
		examArea.classList.add("stdText");
	}
}

function buildQuestion(json){
	var text = "Please write a function named " + json.name + " with arguments " + json.args + " that : " + json.txt + "\n";
	return text;
}

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function(){
	var questions = document.getElementById("exam");
	var qid;
	var eid = examid;
	var ans;
	var score

	for(var i=0; i<questions.children.length; i++){
		qid = questions.children[i].className;
		ans = questions.children[i].childNodes[1].value;
		ans = ans.replace(/\n/g, '<nl>');
		ans = ans.replace(/"/g, '<dq>');
		score = questions.children[i].childNodes[0].childNodes[1].innerHTML;
		//console.log(score); 
		var stdRequest ={
			user: sessionStorage.getItem("usr"),
			examid: eid,
			questionid: qid,
			answer: ans,
			score: score
		}

		//console.log(questionJSON.length);
		for(var j=0; j<questionJSON.length; j++){
			//console.log(questionJSON[j].id);
			if(questionJSON[j].id == qid){
				console.log("found");
				stdRequest["args"] = questionJSON[j].args;
				stdRequest["numcases"] = questionJSON[j].numcases;
				for(var k=0; k<questionJSON[j].numcases; k++){
				stdRequest["output"+(k+1)] = questionJSON[j]["output"+(k+1)];
				stdRequest["a"+(k+1)] = questionJSON[j]["a"+(k+1)];
				stdRequest["b"+(k+1)] = questionJSON[j]["b"+(k+1)];
				stdRequest["c"+(k+1)] = questionJSON[j]["c"+(k+1)];
				}
			}
		}
		console.log(stdRequest);
		list.push(stdRequest);
		//submitAns(stdRequest, responseAns);
	}
	counter = list.length;
	pop_overlayer("Submitting......");
	document.getElementById("backBtn").disabled = true;
	submitAns(list, responseAns);
})

function responseAns(response){
	console.log(response);
	document.getElementById("backBtn").disabled = false;
	var text = response;
	for(var i=0; i<questionJSON.length; i++){
		delete questionJSON[i];
	}
	try{
		text = JSON.parse(text);
		if(text.addAnswer == "true"){
			pop_overlayer("Submit Answer Successfully");
			document.getElementById("backBtn").removeEventListener("click", hide_layer);
			document.getElementById("backBtn").addEventListener("click", function(){
				window.location.replace("HomePage.html");
			});
		}
	}
	catch(error){
		text = "["+ response.slice(0, -1).replace(/\n/g, ",")+"]";
		for(var i=0; i < text.length; i++){
			if(text[i].addAnswer == "false"){
				pop_overlayer("Submit Answer Fail");
				return;
			}
			else{
				counter--;
			}
		}
		console.log(counter);
		if(counter <= 0){
			pop_overlayer("Submit Answer Successfully");
			document.getElementById("backBtn").removeEventListener("click", hide_layer);
			document.getElementById("backBtn").addEventListener("click", function(){
				window.location.replace("HomePage.html");
			});
		}
		else{
			pop_overlayer("Submit Answer Failed");
		}
	}
	//console.log(text);
}
