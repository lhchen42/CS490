/*function getStuds(){
	var stdRequest = {
		act: "getStuds"
	}
	request(stdRequest, buildSelectorR);
}

function printResponseR(response){
	console.log(response);
}

function getExamsR(){ //get available exams
	var stdRequest = {
		act: "getExams"
	}
	request(stdRequest, buildSelectorR)
}

function buildSelectorR(response){
	var text = response.slice(0, -2);
	text = "[" + text.replace(/\n/g, ",") + "]";
	json = JSON.parse(text);
	//console.log(text)

	var tbody = document.querySelector("#reportList tbody");
	//console.log(rows);

		var row = document.createElement("tr");
		var col = document.createElement("td");
		col.appendChild(createSelectorR(json));
		tbody.appendChild(col);
}

function createSelectorR(json){
	console.log(json);
	var selectTag = document.createElement("select");
	selectTag.id = "studList";
	var optionTag = document.createElement("option");
	for(var i = 0; i < json.length; i++){
		if(json[i].user != ""){
			var optionTag = document.createElement("option");
			optionTag.value = json[i].user;
			optionTag.text = json[i].user;                  //change to name
			selectTag.appendChild(optionTag);
		}
	}
	return selectTag;
}*/

/*var view = document.getElementById("View");
view.addEventListener("click", function(){
	var stud = document.getElementById("studList").value;
	sessionStorage.setItem("stud", stud);
	window.location.assign("./GradeReport.html");
})*/