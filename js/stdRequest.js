function request(req, callback, sync=true){
  	var url = "../php/upload.php";
	var xhttp = new XMLHttpRequest();

	xhttp.open("POST", url, sync);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
	};
	var jsonFormat = JSON.stringify(req);
	xhttp.send(jsonFormat);
}

function getCategories(callback){
	var stdRequest = {
		act: "getCategories"
	};
	request(stdRequest, callback);
}

function getQuestions(callback){
	var stdRequest = {
		act: "getQuestions"
	};
	request(stdRequest, callback);
}