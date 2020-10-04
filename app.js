window.addEventListener("hashchange", showNotes, false);

var addTxt = window.document.getElementById("textarea1");
var addTitle = window.document.getElementById("noteName");

showNotes();

var selected;

function compare(a, b) {
  let comparison = 0;
  if (b.changeTime > a.changeTime) {
    comparison = 1;
  } else if (b.changeTime < a.changeTime) {
    comparison = -1;
  }
  return comparison;
}

function showNotes() {
  var notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  let html = "";
  notesObj.sort(compare);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  var str = getDate().split(" ").map(Number);
  var date = new Date(str[0], str[1], str[2], str[3], str[4], str[5]);
  

var formatter = new Intl.DateTimeFormat("en", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});
  
    notesObj.forEach(function(element, index) {
    html += `<div class="row" style="margin-left: 0px;">
                  <div class="card-body col-md-9 card" onclick="Select(this.id)" id="${index}">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-date"> ${formatter.format(date)} </p>
                    <p class="card-text"> <small> ${element.text} </small> </p>
                </div>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn col-md-3"> Delete </button>
              </div>`;
    
  });
  var notesElm = document.getElementById("notes");
  notesElm.innerHTML = html;
  if (location.hash == ""){
    addTxt.value = "";
    addTitle.value = "";
  }
  else{
    var refNote = GetHash(notesObj);
    addTitle.value = refNote[0].title;
    addTxt.value = refNote[0].text;
    var selectedNote = document.getElementById(selected);
    selectedNote.style = "background-color:#CF6679; color:black;";
  }
};

function GetHash(notesObj){
  var ref = location.hash;
  ref = ref.slice(1, ref.length);
  var refNote = notesObj.filter(obj => {return obj.ref === ref});
  return refNote;
}

function Select(index){
  var notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  selected = index;
  location.hash = notesObj[index].ref;
  addTitle.value = notesObj[index].title;
  addTxt.value = notesObj[index].text;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  var dd = document.getElementById(index);
}

function AddZero(time){
  if (time < 10){
    return "0" + time;
  }
  else return time;
}

var addBtn = document.getElementById("button1");
addBtn.addEventListener("click", function(e) {
  if (location.hash != ""){
    return;
  }

  var time = getDate();
  if (addTitle.value == "")
  {
    alert("Please enter note name");
    return;
  }
  var notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  var hash = addTitle.value;
  var myObj = {
    title: addTitle.value,
    text: addTxt.value,
    date: time,
    ref: ID(addTitle.value),
    changeTime: time
  }

 //console.log(ID(myObj.title));

  notesObj.unshift(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";

  //location.hash = hash;

//   console.log(notesObj);
  showNotes();
});

function deleteNote(index) {
  if (!confirm("Are you sure?")){
    return;
  }
  var notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  if (index == selected){
    location.hash = "";
    selected = null;
  } else if (index < selected){
    selected--;
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function getDate(){
  var today = new Date();
  var date = today.getFullYear() + ' ' + AddZero(today.getMonth()) + ' ' + AddZero(today.getDate());
  var time = AddZero(today.getHours()) + " " + AddZero(today.getMinutes()) + " " + AddZero(today.getSeconds());
  return date + " " + time;
}

addTxt.addEventListener('input', function(e){
  if (location.hash == ""){
    return;
  }
  var notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  
  
  var time = getDate();

  var refNote = GetHash(notesObj);
  refNote[0].text = addTxt.value;
  refNote[0].changeTime = time;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  selected = 0;
  showNotes();
});

addTitle.addEventListener('input', function(e){
  if (location.hash == ""){
    return;
  }
  var notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  
  
  var time = getDate();

  var refNote = GetHash(notesObj);
  refNote[0].title = addTitle.value;
  refNote[0].changeTime = time;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  selected = 0;
  showNotes();
});

var ID = function (name) {
  var len = Math.min(name.length, 4);

  return name.substr(0, len) + Math.random().toString(36).substr(2, 9);
};