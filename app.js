/*const bu = document.getElementById("button1");
var n = 0;
var notes = new Array();
var buttons = document.getElementById("table1").getElementsByTagName("button");

function addRow() {
    for (const element of buttons) {
        element.style = "background-color: rgb(29, 28, 35, 30);";
    }
    var tableRef = document.getElementById('table1').getElementsByTagName('tbody')[0];
    var newRow   = tableRef.insertRow(0);
    var newCell  = newRow.insertCell(0);
    var newButton  = document.createElement("button");
    var today = new Date();
    var date = today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    newButton.textContent = "New note" + " " + n;
    newButton.id = "note" + n;
    var note = {
        "id" : newButton.id,
        "time" : date + " " + time
    };
    notes.unshift(note);
    n++;
    newCell.appendChild(newButton);
    Select(newButton.id);
}

function Select(id){
    for (const element of buttons) {
        element.style = "background-color: rgb(29, 28, 35, 30);";
      }
    var selectedButton = document.getElementById(id);
    selectedButton.style = "background-color: rgb(201, 149, 33, 110);";
}

document.addEventListener('click',function(e){
    console.log(e.target + ' - ' + e.target.id);
    if(e.target.id.slice(0, 4) == 'note'){
        console.log(111);
          Select(e.target.id);
     }
 });*/

showNotes();

var selected;

 function showNotes() {
    var notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
      var cuttedText;
      if (element.text.length > 26){
        cuttedText = element.text.slice(0, 24) + "...";
      }
      else{
        cuttedText = element.text;
      }
      html += `<div class="noteCard col-md-9 card">
                  <div class="card-body" onclick="Select(this.id)">
                    <h5 class="card-title" style="line-height: 80%; margin-top: -5%;">${element.title}</h5>
                    <p class="card-date" > ${element.date} </p>
                    <p class="card-text" style="margin-top: -10%; color: rgb(179, 179, 179);"> <small> ${cuttedText} </small> </p>
                  </div>
                </div>
  <div class="delBtn col-md-3">
      <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary"> Delete </button>
  </div>`;
    });
    var notesElm = document.getElementById("notes");
      notesElm.innerHTML = html;
};

function Select(index){
  if (!confirm("Are you sure?")){
    return;
  }
  var notes = localStorage.getItem("notes");
  
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

var addBtn = document.getElementById("button1");
addBtn.addEventListener("click", function(e) {
  var addTxt = document.getElementById("textarea1");
  var addTitle = document.getElementById("noteName");
  var today = new Date();
  var date = today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  if (addTitle.value == "")
  {
   
    alert("Please enter note name");
    return;
  }
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  var myObj = {
    title: addTitle.value,
    text: addTxt.value,
    date: date + " " + time
  }
  notesObj.unshift(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

function deleteNote(index) {
      
      if (!confirm("Are you sure?")){
        return;
      }
      var notes = localStorage.getItem("notes");
      
      if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
    
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
    }
    