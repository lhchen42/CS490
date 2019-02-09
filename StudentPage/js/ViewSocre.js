var _exam;
var _json = [];

window.onload = function(){
	var usr = sessionStorage.getItem("usr");
	var stdRequest = {
		act: "getStudExam",
		user: usr
	}
	console.log(stdRequest);
	request(stdRequest, getExam);
}

function getExam(response){
	console.log(response);
	var json = JSON.parse(response);
	var id = json.getStudExam;

	var stdRequest = {
		act: "getAnswers",
		user: sessionStorage.getItem("usr"),
		examid: id
	}
	console.log(stdRequest);
	request(stdRequest, getScore)
}

function getScore(response){
	console.log(response);
	if(response == "\n" || response ==""){
		console.log("Not Release");
	}
	else{
		try{
			var j = JSON.parse(response);
			_json.push(j);
		}
		catch(error){
			console.log(response);

			var text = response.slice(0, -1);
			text = "[" + text.replace(/\n/g, "\\n") + "]";
			console.log(text);
			_json = JSON.parse(text);
		}
		console.log(_json);
		console.log(_exam);	
		var stdRequest = {
			act: "getExam",
			exam: _json[0].exam
		}
		console.log(stdRequest);
		request(stdRequest, getName);
	}
}

function getName(response){
	console.log(response);
	var name = JSON.parse(response);
	_exam = name;
	buildTable()
}

function buildTable(){
	var total = 0;
	var tbody = document.querySelector("#gradeList tbody");
	console.log(tbody);
	for(var i=0; i < _json.length; i++){
		total+=Number(_json[i].grade);
	}

	var row = document.createElement("tr");
	var col1 = document.createElement("td");
	var col2 = document.createElement("td");
	col1.textContent = _exam.name;
	col2.textContent = total + " out of " + (_json.length * 20);
	row.appendChild(col1);
	row.appendChild(col2);
	tbody.appendChild(row);
	//console.log(total + " out of " + _json.length);
}