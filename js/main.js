function submitData(){
  var usr = document.getElementById('UCID').value;
  var pwd = document.getElementById('PWD').value;

  var loginData={
    username: usr, password: pwd
  };

  //console.log(usr);
  //console.log(pwd);
  console.log(JSON.stringify(loginData));


  var url = "./php/submit.php";
  //var url = "https://web.njit.edu/~tc324/CS490/middle.php";
  var xhttp = new XMLHttpRequest();


  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      console.log(this.responseText);
      if(obj.login == "prof"){
        sessionStorage.setItem("usr", usr);
      	window.location.assign("./InstructorPage/ExamCreation.html");
      	//document.getElementById("text").innerHTML = "Login Fail";
      }
      else if(obj.login == "stud"){
        sessionStorage.setItem("usr", usr);
      	window.location.assign("./StudentPage/HomePage.html");
      }
      else{
	document.getElementById("text").innerHTML="Login Fail";
      }
      //document.getElementById("text").innerHTML = obj.login;
    }
  };
  xhttp.send("UCID="+encodeURIComponent(usr)+"&"+"PWD="+encodeURIComponent(pwd));
}
