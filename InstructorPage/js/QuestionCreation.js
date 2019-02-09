var questionList = [];
var currentQuestion;
var counter = 0;



window.onload = function(){
	console.log("questionCreation.js loaded")
	//getCategories(printResponse);
	//printFilterSection();
	buildTestCase()
	fillQuestionBank();
}

function printResponse(response){
	console.log(response);
}




//-----------------------------------------------------------------------------------------
tcNum = document.querySelector("#testCasesForm input[type='number']");
tcNum.setAttribute("min", min);
tcNum.setAttribute("max", max);
var min = 2;
var max = 6;
var currentNum = min;
tcNum.value = min;

/*function CreateSelect(arr){
	var selectTag = document.createElement("select", "name='argType'");
	for(var i = 0; i < arr.length; i++){
		var optionTag = document.createElement("option");
		optionTag.value = arr[i];
		optionTag.text = arr[i];
		selectTag.appendChild(optionTag);
	}
	return selectTag;
}*/
function buildTestCase(){
	for(var i=0; i < min; i++){
		var testCase = document.createElement("div");
		testCase.setAttribute("class", "testCase");
		var tcInput1 = document.createElement("input");
		var tcInput2 = document.createElement("input");
		var tcInput3 = document.createElement("input");
		var SampleOutput = document.createElement("textArea");


		tcInput1.setAttribute("type", "text");
		tcInput2.setAttribute("type", "text");
		tcInput3.setAttribute("type", "text");
		SampleOutput.setAttribute("rows", "4");
		SampleOutput.setAttribute("cols", "50");
		SampleOutput.setAttribute("placeHolder", "SampleOutput");	

		testCase.appendChild(tcInput1);
		testCase.appendChild(tcInput2);
		testCase.appendChild(tcInput3);
		testCase.appendChild(SampleOutput);

		document.querySelector("#testCasesForm").appendChild(testCase);
	}
}



tcNum.addEventListener("input", function(){
	if(tcNum.value > max){
		tcNum.value = max;
	}
	if(tcNum.value < min){
		tcNum.value = min;
	}
	if(tcNum.value > currentNum){
		for(var i=0; i<tcNum.value-currentNum; i++){
			var testCase = document.createElement("div");
			testCase.setAttribute("class", "testCase");
			var tcInput1 = document.createElement("input");
			var tcInput2 = document.createElement("input");
			var tcInput3 = document.createElement("input");
			var SampleOutput = document.createElement("textArea");


			tcInput1.setAttribute("type", "text");
			tcInput2.setAttribute("type", "text");
			tcInput3.setAttribute("type", "text");
			SampleOutput.setAttribute("rows", "4");
			SampleOutput.setAttribute("cols", "50");
			SampleOutput.setAttribute("placeHolder", "SampleOutput");	

			testCase.appendChild(tcInput1);
			testCase.appendChild(tcInput2);
			testCase.appendChild(tcInput3);
			testCase.appendChild(SampleOutput);

			document.querySelector("#testCasesForm").appendChild(testCase);
			console.log("Add one");
		}
	}
	else if(tcNum.value < currentNum){
		for(var i=0; i<currentNum-tcNum.value; i++){
			console.log("remove");
			document.querySelector(".testCase").remove();
		}
	}
	currentNum = tcNum.value;
})


/*function createRow(data){
	var table = document.querySelector("table[name='questionTable']");
	var row = document.createElement("tr");
	var col = document.createElement("th");

	var text = "Please write a function named " + data.name + " with arguments " + data.args + " that : " + data.txt + "\n";
	//text += "Example: " + data.output +"\n";
	col.innerHTML = text;
	row.appendChild(col);
	table.appendChild(row);
}*/

	//----------------------------------------

var addbtn = document.getElementById("add");
addbtn.addEventListener("click", function(){
	var funName = document.getElementById("funName");
	var difty = document.getElementById("difficulty");
	var category = document.getElementById("category");
	var restric = document.getElementById("restriction");
	var ans = document.getElementById("answer");
	var add_info = document.getElementById("additional");
	var argus = document.getElementById("args");
	console.log(currentNum);
	var testCases = document.getElementsByClassName("testCase");
	//console.log(testCases);
	//var _a = document.getElementById("a");
	//var _b = document.getElementById("b");
	//console.log(funName.value);
	//console.log(difficulty.value);
	//console.log(answer.value);
	//var arguments = []
	//var argForms = document.getElementsByClassName("argForm");
	/*for(var i = 0; i < argForms.length; i++){
		//console.log(argForms[i].childNodes[0].value);
		//console.log(argForms[i].childNodes[1].value);
		arguments.push(new Object({
			type: argForms[i].childNodes[0].value,  //types
			name: argForms[i].childNodes[1].value   //names
		}));
	}*/

	var data = {
		act: "addQuestion",
		name: funName.value.replace(/"/g, "<dq>"),
		args: argus.value.replace(/"/g, "<dq>"),
		diff: difty.value,
		requirement: restric.value,
		//output: ans.value,
		txt: add_info.value.replace(/"/g, "<dq>"),
		cat: category.value,
		numcases: currentNum
	}
	currentQuestion = data;
	for(var i=0; i<currentNum; i++){
		//console.log(testCases[i].childNodes);
		//for(var j=0; j<testCases[i].childNodes.length; i++){
			//data["a"]
		//}
		//console.log(testCases[i].childNodes[0]);
		data["a"+(i+1)] = testCases[i].childNodes[0].value.replace(/"/g, "<dq>");
		data["b"+(i+1)] = testCases[i].childNodes[1].value.replace(/"/g, "<dq>");
		data["c"+(i+1)] = testCases[i].childNodes[2].value.replace(/"/g, "<dq>");
		data["output"+(i+1)] = testCases[i].childNodes[3].value.replace(/"/g, "<dq>");
		testCases[i].childNodes[0].value = "";
		testCases[i].childNodes[1].value = "";
		testCases[i].childNodes[2].value = "";
		testCases[i].childNodes[3].value = "";


		//data["t"+(i+1)] = testCases[i].value;
		//testCases[i].value = "";
	}

	funName.value = "";
	difty.value = "NULL";
	category.value = "NULL";
	restric.value = "NULL";
	//ans.value = "";
	add_info.value = "";
	argus.value = "";
	console.log(data);
	//createRow(data);
	//questionList.push("addQuestion");
	//questionList.push(data);
	//console.log(questionList);
	request(data, addQuestion);
});

/*var upload = document.getElementById("upload");
upload.addEventListener("click", function(){
	if(questionList.length <= 0){
		alert("No questions was been added!");
	}
	else{
		counter = questionList.length;
		for(var i =0; i < questionList.length; i++){
			//console.log(questionList[i]);
			request(questionList[i], addQuestion);
		}
	}
})*/

function addQuestion(response){
	  console.log(response);
	  var json = JSON.parse(response);
	  if(json.addQuestion == "false"){
	  	pop_overlayer("Fail");
	  }
	  else{
	  	updateBank(json.addQuestion);
	  }


	  //console.log(JSON.parse(response).addQuestion)
      /*if(JSON.parse(response).addQuestion == "false"){
      		alert("Add Question Fail");
      		return;
      }
      counter--;
      if(counter == 0){
      	alert("Add Questions Sucessfully");
      }*/
}

function updateBank(id){
	var qust = document.querySelector("#questionBank tbody");
	var row = buildQuestionRow(currentQuestion, id);
	qust.appendChild(row);
}