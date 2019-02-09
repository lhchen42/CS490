var sidebar = document.querySelector("#sidebar");
var currentDiv = document.querySelector("#home_page");
sidebar.addEventListener("click", taggleDiv, false);

window.onload = function(){
  //Hide Other div except Home
  //document.getElementById("add_new_question").style.display = "none";
  //document.getElementById("create_new_exam").style.display = "none";
}

function taggleDiv(e) {
    if (e.target !== e.currentTarget) {
        for(var i = 0; i < this.children.length; i++){
          if(this.children[i] != e.target){
            document.querySelector(this.children[i].getAttribute("href")).style.display = "none";
          }
          else{
            currentDiv = this.children[i];
            document.querySelector(currentDiv.getAttribute("href")).style.display="block";
          }
        }
    }
    e.stopPropagation();
}
