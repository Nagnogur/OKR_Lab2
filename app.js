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

 function showNotes() {
    var notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notes);
    let html = "";
    notesObj.forEach(function(element, index) {
      html += `
              <div class="noteCard my-2 mx-2 card">
                      <div class="card-body">
                          <h5 class="card-title">${element.title}</h5>
                          <p class="card-text"> ${element.text}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
    });
    var notesElm = document.getElementById("notes");
      notesElm.innerHTML = html;
  }

var addBtn = document.getElementById("button1");
addBtn.addEventListener("click", function(e) {
    console.log(2121);
  var addTxt = document.getElementById("textarea1");
  var addTitle = document.getElementById("noteName");
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  var myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

function deleteNote(index) {
      
    
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
    