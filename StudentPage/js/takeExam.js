var allExams;

var confirmBtn = document.getElementById("confirmBtn");
confirmBtn.addEventListener("click", function(){
	window.location.assign("./ExamPage.html");
})

var reportBtn = document.getElementById("reportBtn");
reportBtn.addEventListener("click", function(){
	window.location.assign("./StudentReport.html");
})

window.onload = function(){
	getExams();
	getStudExam();
}

function printResponse(response){
	console.log(response);
}

function getExams(){
	var stdRequest = {
		act: "getExams"
	}
	request(stdRequest, gotExams, false)
}

function gotExams(response){
	var text = response.slice(0, -2);
	text = "[" + text.replace(/\n/g, ",") + "]";
	allExams = JSON.parse(text);
}

function getStudExam(){
	var usr = sessionStorage.getItem("usr");
	var stdRequest = {
		act: "getStudExam",
		user: usr
	}
	request(stdRequest, studExamInfo)
}

function studExamInfo(response){
	var studExam = JSON.parse(response);
	for(var i=0; i<allExams.length; i++){
		if(allExams[i].id === studExam.getStudExam){
			document.getElementById("examName").innerHTML = allExams[i].name;
			sessionStorage.setItem("examName", allExams[i].name);
			return;
		}
	}
	console.log("No Exam Available");
}