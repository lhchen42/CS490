var examid = "";
var questionJSON;
var pointsJSON;
var answersJSON;
var list = [];
var counter = 0;

//GetStudentExam() 	 	Send request to getStudent exam id  of the student
//GetExam()			 	Callback function of GetStudnetExam, send the request to get question of the Exam
//GetQuestions()		Send request to get questions of the exam
//getQuestionPoint() 	Send request to get points of each exam question
//getPoints()        	Callback function for getQuestionPoint
//getStudAnswers()		Send request to get student's answers
//gotAnswers()			Callback function for getStudAnswers
//buildExam()			Build Exam Layout
//buildQuestion()		Formulate Questions
//parseAns()			Student Answers parser, replace <dq> with ", <nl> with \n
//setGradeAndComment()	Send request to set the new Grade and new Comment
//setGradeSuccess()		Callback function for setAnswerGrade Request
//setCommentSuccess()	Callback function for setAnswerComment Request
//releaseScore()		Callback function for setExamRelease Request

//-----------------------------------------------------------------------------------
window.onload = function(){
	//console.log("Student Report")
	var usr = sessionStorage.getItem("stud");
	//console.log("stud: " + usr);

	getStudExam();
}

function getStudExam(){
	var usr = sessionStorage.getItem("stud");
	var stdRequest = {
		act: "getStudExam",
		user: usr
	}
	//console.log(stdRequest);
	request(stdRequest, getExam);
}

function getExam(respones){
	//console.log(respones);
	var id = JSON.parse(respones).getStudExam;
	examid = id;
	//console.log(id);
	var stdRequest = {
		act: "getQuestionsExam",
		exam: id
	}
	//console.log(stdRequest);
	request(stdRequest, getQuestions);
}

function getQuestions(response){
	//console.log(response);
	var text = response.slice(0, -1);
	text = "[" + text + "]";
	
	questionJSON = JSON.parse(text);

	getQuestionsPoints();
}


function getQuestionsPoints(){
	var stdRequest = {
		act: "getPointsExam",
		exam: examid
	}
	//console.log(stdRequest);
	request(stdRequest, getPoints);
}

function getPoints(response){
	//console.log(response);
	pointsJSON = JSON.parse(response);
	getStudAnswers()
}

function getStudAnswers(){
	var stdRequest = {
		act: "getAnswersP",
		user: sessionStorage.getItem("stud"),
		examid: examid
	}
	//console.log(stdRequest);
	request(stdRequest, gotAnswers)
}

function gotAnswers(response){
	console.log(response);
	var text = response.slice(0, -1);
	text = "[" + text + "]";
	
	answersJSON = JSON.parse(text);
	console.log(answersJSON);
	if(answersJSON.length === 0){
		pop_overlayer("No Answer Yet");
		document.getElementById("backBtn").removeEventListener("click", pop_overlayer);
		document.getElementById("backBtn").addEventListener("click", function(){
			document.location.replace("./AssignExam.html");
		})
		return;
	}
	//console.log(response);
	var text = response.slice(0, -1);
	text = "[" + text + "]";
	
	answersJSON = JSON.parse(text);
	//console.log(answersJSON);
	buildExam();
}

function printResponse(response){
	console.log(response);
}

function buildExam(){
	var examArea = document.getElementById("exam");
	//console.log(questionJSON);
	var j = 0;
	for(var i =0; i<questionJSON.length; i++){
		if(questionJSON[i].id == "0"){
			continue;
		}

		//Student's Answer
		var question = buildQuestion(questionJSON[i]);
		var div = document.createElement("div");
		div.id = ("q"+questionJSON[i].id);
		div.style.borderBottom = "2px solid black";
		div.style.padding = "50px 0";

		var p = document.createElement("p");
		p.innerHTML = question + "(pt. " + "<span>" +pointsJSON["p"+(i+1)] + "</span>" + ").";

		var textArea = document.createElement("textarea");
		textArea.rows = "20";
		textArea.cols = "100";
		//console.log(answersJSON);
		if(answersJSON[j].txt != ""){
			var ans = parseAns(answersJSON[j].txt);
			textArea.value = ans;
		}else{
			textArea.value = "Empty";
		}
		textArea.setAttribute("disabled", true);
		textArea.classList.add("stdTextArea");

		//End Student's Anwer


		//Main Report
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");

		var grade = document.createElement("tr");
		var grade_col1 = document.createElement("td");
		var grade_col2 = document.createElement("td");
		var grade_input = document.createElement("input");
		grade_input.setAttribute("type", "text");
		grade_input.placeholder = "Grade";
		grade_input.classList.add("grade");
		grade_input.value = answersJSON[j].grade;

		grade_col1.innerHTML = "Grade: ";
		grade_col2.appendChild(grade_input);
		grade.appendChild(grade_col1);
		grade.appendChild(grade_col2);

		var comment = document.createElement("tr");
		var comment_col1 = document.createElement("td");
		var comment_col2 = document.createElement("td");
		comment_col2.setAttribute("contenteditable", "true");
		comment_col2.classList.add("comment");
		comment_col2.style.padding = "0px 10px";

		comment_col1.innerHTML = "Comment: ";
		comment_col2.innerHTML = answersJSON[j].comment.replace(/Test/g, "<hr>Test").replace("score(round to int):", "<hr><strong>score(round to int):</strong>").replace(/<hl>/g, "<span class=\"stdhighlight\">").replace(new RegExp("</hl>", "g"), "</span>");
		//comment_col2.appendChild(comment_textarea);
		comment.appendChild(comment_col1);
		comment.appendChild(comment_col2);

		var pro_comment = document.createElement("tr");
		var pro_comment_col1 = document.createElement("td");
		var pro_comment_col2 = document.createElement("td");
		pro_comment_col1.innerHTML = "Professor's Comment: ";
		//pro_comment_col2.innerHTML = answersJSON[j].comment;
		pro_comment.appendChild(pro_comment_col1);
		pro_comment.appendChild(pro_comment_col2);

		tbody.appendChild(grade);
		tbody.appendChild(comment);
		//tbody.appendChild(pro_comment);

		//End Main Report

		//Grade and comment Settor
		var newGrade = document.createElement("input");
		newGrade.id = "newGrade";
		newGrade.setAttribute("type", "number");
		newGrade.placeholder = "New Grade";

		var pro_Comment = document.createElement("textarea");
		pro_Comment.id = "newComment";
		pro_Comment.rows = "8";
		pro_Comment.cols = "50";
		pro_Comment.placeholder = "Professor's Comment";

		var setBtn = document.createElement("button");
		setBtn.setAttribute("type", "button");
		setBtn.id = "setBtn";
		setBtn.innerHTML = "Set";
		setBtn.classList.add("stdButton");

		setBtn.addEventListener("click", setGradeAndComment);

		var innerDiv = document.createElement("div");
		//innerDiv.appendChild(newGrade);
		//innerDiv.appendChild(pro_Comment);
		innerDiv.appendChild(setBtn);
		table.appendChild(tbody);

		div.appendChild(p);
		div.appendChild(textArea);
		div.appendChild(table);
		//div.appendChild(setBtn);
		div.appendChild(innerDiv);
		examArea.appendChild(div);
		j++;
	}
}

function parseAns(text){
	var parsedText = text.replace(/<nl>/g,"\n");
	parsedText = parsedText.replace(/<dq>/g, '\"');
	return parsedText;
}

function buildQuestion(json){
	var text = "Please write a function named " + json.name + " with arguments " + json.args + " that : " + json.txt + "\n";
	//text += "Example: " + json.output +"\n";
	return text;
}


//-------------------------------------------------------------------------------------------;

function setGradeAndComment(){
	var id = this.parentNode.parentNode.id;
	var newGrade = document.querySelector("#"+id+" .grade").value;
	//console.log(newGrade);
	var newComment = document.querySelector("#"+id+" .comment").innerHTML;

	//remove span tag and horizontal line
	newComment = newComment.replace(new RegExp("<span class=\"stdhighlight\">", "g"), "<hl>").replace(new RegExp("</span>", "g"), "</hl>").replace(/<hr>/g, "");
	//console.log(newComment);


		var stdGradeRequest = {
			act: "setAnswerGrade",
			id: id.replace("q", ""),
			exam: examid,
			user: sessionStorage.getItem("stud"),
			grade: newGrade
		}
		//console.log(stdGradeRequest);
		var stdCommentRequest = {
			act: "setAnswerComment",
			id: id.replace("q", ""),
			exam: examid,
			user: sessionStorage.getItem("stud"),
			comment: newComment
		}
		//console.log(stdCommentRequest);
		request(stdGradeRequest, setGradeSuccess);
		request(stdCommentRequest, setCommentSuccess);
}

function setGradeSuccess(response){
	var json = JSON.parse(response);
	//console.log(json);
	if(json.setAnswerGrade = "true"){
		pop_overlayer("Success!");
	}
	else{
		pop_overlayer("Fail! Try Again.");
	}
}

function setCommentSuccess(response){
	var json = JSON.parse(response);
	//console.log(json);
	if(json.setCommentGrade = "true"){
		pop_overlayer("Success!");
	}
	else{
		pop_overlayer("Fail! Try Again.");
	}
}

var releaseBtn = document.getElementById("release");
releaseBtn.addEventListener("click", function(){
	//console.log("release: "+ examid);
	var stdRequest = {
		act: "setExamRelease",
		examid: examid
	}
	//console.log(stdRequest);
	pop_overlayer("Releasing......");
	request(stdRequest, releaseScore);
});

function releaseScore(response){
	//console.log(JSON.parse(response));
	if(JSON.parse(response).setExamRelease == "true"){
		pop_overlayer("Release Exam Successfully");
	}
	else{
		pop_overlayer("Release Exam Failed");
	}
}

