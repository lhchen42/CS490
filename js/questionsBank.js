console.log("questionsBank.js loaded");

function fillQuestionBank(){
	var stdRequest = {
		act: "getQuestions"
	}
	request(stdRequest, buildTable);
}

function buildTable(response){
	var txt1 = response;
	txt1 = txt1.slice(0, -2);
	txt1 = "["+txt1+"]";
	txt1 = txt1.replace(/\n/g,",");

	var json = JSON.parse(txt1);
	var qust = document.querySelector("#questionBank tbody");
	var qlast = document.querySelector("#questionBank tbody tr");
	for(var i=1; i<json.length; i++){
		row = buildQuestionRow(json[i]);
		qust.insertBefore(row, qlast);
	}
}

function buildQuestion(obj){
	var text = "Please write a function named " + obj.name.replace(/<dq>/g, "\"") + " that takes " + obj.args.replace(/<dq>/g, "\"") + " that : " + obj.txt.replace(/<dq>/g, "\"") + "\n";
	//text += "Example: " + obj.output +"\n";
	return text;
}

function buildQuestionRow(obj, id){
	var row = document.createElement("tr");
	var col1 = document.createElement("td");
	var col2 = document.createElement("td");
	var col3 = document.createElement("td");
	var col4 = document.createElement("td");
	if(id){
		col1.innerHTML = id;
	}else{
		col1.innerHTML = obj.id;
	}
	//col1.classList.add("questionBankId");
	col2.innerHTML = buildQuestion(obj);
	col2.width = "100%";
	//col2.classList.add("questionBankStdCol");

	col3.innerHTML = obj.cat;
	col4.innerHTML = obj.diff;

	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	row.appendChild(col4);
	return row;
}