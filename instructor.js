var questionList = [];

var argNum = document.querySelector("input[type='number']");
var currentNum = 0;
var min = 0;
var max = 5;
argNum.setAttribute("min", min);
argNum.setAttribute("max", max);
var types = ["int", "double", "bool"];

function CreateSelect(arr){
	var selectTag = document.createElement("select", "name='argType'");
	for(var i = 0; i < arr.length; i++){
		var optionTag = document.createElement("option");
		optionTag.value = arr[i];
		optionTag.text = arr[i];
		selectTag.appendChild(optionTag);
	}
	return selectTag;
}

argNum.addEventListener("input", function(){
	if(argNum.value > max){
		argNum.value = max;
	}
	if(argNum.value < min){
		argNum.value = min;
	}
	if(argNum.value > currentNum){
		for(var i=0; i<argNum.value-currentNum; i++){
			//Create a new form for an argument
			var argForm = document.createElement("div");
			argForm.setAttribute("class", "argForm");
			var argName = document.createElement("input", "type='text'");
			argName.setAttribute("class", "arg_name");
			var argSelector = CreateSelect(types);;
			argForm.appendChild(argSelector);
			argForm.appendChild(argName);
			document.querySelector("div[name='args']").appendChild(argForm);
		}
	}
	else if(argNum.value < currentNum){
		for(var i=0; i<currentNum-argNum.value; i++){
			document.querySelector(".argForm").remove();
		}
	}
	currentNum = argNum.value;
})


function createRow(data){
	var table = document.querySelector("table[name='questionTable']");
	var row = document.createElement("tr");
	var col = document.createElement("th");
	var txt = "Please write a function named " + data.name + " with " +
		data.variables.length + " arguments ";

	for(var i=0; i<data.variables.length; i++){
		txt+=", " + data.variables[i].type + " " +data.variables[i].name;
		//console.log(data.variables[i].name);
	}
	col.innerHTML = txt;
	row.appendChild(col);
	table.appendChild(row);
}


var addbtn = document.getElementById("add");
addbtn.addEventListener("click", function(){
	var funName = document.getElementById("funName");
	var difty = document.getElementById("difficulty");
	var ans = document.getElementById("answer");
	//console.log(funName.value);
	//console.log(difficulty.value);
	//console.log(answer.value);
	var arguments = []
	var argForms = document.getElementsByClassName("argForm");
	for(var i = 0; i < argForms.length; i++){
		//console.log(argForms[i].childNodes[0].value);
		//console.log(argForms[i].childNodes[1].value);
		arguments.push(new Object({
			type: argForms[i].childNodes[0].value,  //types
			name: argForms[i].childNodes[1].value   //names
		}));
	}

	var data = {
		name: funName.value,
		variables: arguments,
		difficulty: difty.value,
		answer: ans.value
	}

	createRow(data);
	questionList.push(data);
});

var upload = document.getElementById("upload");
upload.addEventListener("click", function(){
	if(questionList.length <= 0){
		alert("No questions was been added!");
	}
	var url = "https://web.njit.edu/~lhc2/submit.php";
	//var url = "https://web.njit.edu/~tc324/CS490/middle.php";
	var xhttp = new XMLHttpRequest();


	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      if(obj.login == "false"){
      	document.getElementById("text").innerHTML = "Login Fail";
      }
      else{
      	window.location.replace("Instructor.html");
      }
      //document.getElementById("text").innerHTML = obj.login;
    }
	};
	xhttp.send(questionList);
})

