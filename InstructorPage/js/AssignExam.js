var usrlist = [];
var currentUsr;
var usrIndex = 0;

window.onload = function(){
	getStudents();
	getStudExam();
};

function getStudents(){
	var stdRequest = {
		act: "getStuds"
	}
	request(stdRequest, buildList, false)
}

function buildList(response){
	var text = response.slice(0, -2);
	text = "[" + text.replace(/\n/g, ",") + "]";
	var json = JSON.parse(text);
	//console.log(text);
	var tbody = document.querySelector("#studentList tbody")
	for(var i=0; i<json.length; i++){
		if(json[i].user == "")
			continue;
		var row = document.createElement("tr");
		var col1 = document.createElement("td");
		//console.log(json[i].user);
		usrlist.push(json[i].user);
		col1.innerHTML = json[i].user;

		row.appendChild(col1);
		tbody.appendChild(row);
	}
	getExams();
}

function getExams(){
	var stdRequest = {
		act: "getExams"
	}
	request(stdRequest, buildSelector, false)
}

function buildSelector(response){
	var text = response.slice(0, -2);
	text = "[" + text.replace(/\n/g, ",") + "]";
	json = JSON.parse(text);
	//console.log(text)

	var rows = document.querySelectorAll("#studentList tbody tr");
	//console.log(rows);

	for(var i=0; i<rows.length; i++){
		var col = document.createElement("td");
		col.appendChild(createSelector(json));
		rows[i].appendChild(col);
		
		var viewBtn = document.createElement("button");
		viewBtn.classList.add("stdButton");
		viewBtn.type = "button";
		viewBtn.innerHTML = "View Report";
		viewBtn.addEventListener("click", function(){
			var stud = this.parentNode.parentNode.childNodes[0].innerHTML;
			sessionStorage.setItem("stud", stud);
			window.location.assign("./GradeReport.html");
		});
		var colBtn = document.createElement("td");
		colBtn.appendChild(viewBtn);

		rows[i].appendChild(colBtn);

	}
}

function createSelector(json){
	var selectTag = document.createElement("select");
	var optionTag = document.createElement("option");
	optionTag.value = "0";
	optionTag.text = "Remove Exam";
	selectTag.classList.add("examSelector");                
	selectTag.appendChild(optionTag);
	for(var i = 0; i < json.length; i++){						//append options
		var optionTag = document.createElement("option");
		optionTag.value = json[i].id;
		optionTag.text = json[i].name;                 
		selectTag.appendChild(optionTag);
	}
	return selectTag;
}

function getStudExam(){
	for(var i=0; i<usrlist.length; i++){
		var stdRequest = {
			act: "getStudExam",
			user: usrlist[i]
		}
		request(stdRequest, gotStudExam);
	}
}

function gotStudExam(response){
	currentExam=response;
	//console.log(currentExam);
	var examSelectors = document.getElementsByClassName("examSelector");
	//console.log(examSelectors);
	for(usrIndex; usrIndex < examSelectors.length; usrIndex++){
		examSelectors[usrIndex].value = JSON.parse(currentExam).getStudExam;
	}
}


var assignBtn = document.getElementById("assign");
assign.addEventListener("click", function(){
	var rows = document.querySelector("#studentList tbody").childNodes;
	//console.log(rows);
	for(var i=1; i<rows.length; i++){
		var studentName = rows[i].childNodes[0].textContent;				//td.textContent
		var examID = rows[i].childNodes[1].childNodes[0].value;             //td.selector.value
		var stdRequest = {
			act: "setStudExam",
			user: studentName,
			examid: examID
		}
		
		//console.log(stdRequest);
		pop_overlayer("Assigning...");
		document.getElementById("backBtn").disabled = true;
		request(stdRequest, setExam);
	}
});

function setExam(response){
	//console.log(response);
	if(JSON.parse(response).setStudExam == "true"){
		pop_overlayer("Success!");
		document.getElementById("backBtn").disabled = false;
	}
	else{
		pop_overlayer("Success! Try Again.");
	}
}