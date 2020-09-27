window.addEventListener("hashchange", showNotes, false);

var addTxt = window.document.getElementById("textarea1");
var addTitle = window.document.getElementById("noteName");

var domain = location.hash;
console.log(domain);

showNotes();

function showNotes() {
  var notes = localStorage.getItem("notes");
  
  if (notes == null) {
    notesObj = [];
  } 
  else {
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
    var cuttedName;
    if (element.title.length > 16){
      cuttedName = element.title.slice(0, 16) + "...";
    }
    else{
      cuttedName = element.title;
    }
    html += `<div class="row" style="margin-left: 0px;">
                <div class="noteCard col-md-9 card">
                  <div class="card-body" onclick="Select(this.id)" id="${index}">
                    <h5 class="card-title" style="line-height: 80%; margin-top: -5%;">${cuttedName}</h5>
                    <p class="card-date" > ${element.date} </p>
                    <p class="card-text" style="margin-top: -10%; color: rgb(179, 179, 179);"> <small> ${cuttedText} </small> </p>
                  </div>
                </div>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn col-md-3"> Delete </button>
              </div>`;
  });
  var notesElm = document.getElementById("notes");
  notesElm.innerHTML = html;
  var ref = location.hash;
  if (ref == domain){
    addTxt.value = "";
    addTitle.value = "";
  }
  else{
    ref = ref.slice(1, ref.length);
    var refNote = notesObj.filter(obj => {return obj.ref === ref});
    addTitle.value = refNote[0].title;
    addTxt.value = refNote[0].text;
  }
};

function Select(index){
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  location.hash = notesObj[index].ref;
  addTitle.value = notesObj[index].title;
  addTxt.value = notesObj[index].text;
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
  if (location.hash != domain){
    return;
  }

  var today = new Date();
  var date = AddZero(today.getDate()) + '.' + AddZero(today.getMonth() + 1) + '.' + today.getFullYear();
  var time = AddZero(today.getHours()) + ":" + AddZero(today.getMinutes()) + ":" + AddZero(today.getSeconds());
  if (addTitle.value == "")
  {
    alert("Please enter note name");
    return;
  }
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  var hash = addTitle.value;
  var myObj = {
    title: addTitle.value,
    text: addTxt.value,
    date: date + " " + time,
    ref: hash
  }
  notesObj.unshift(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  /*addTxt.value = "";
  addTitle.value = "";*/

  location.hash = hash;

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
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

addTxt.addEventListener('input', function(e){
  if (location.hash == domain){
    return;
  }
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  var ref = location.hash.slice(1, location.hash.length);
  var refNote = notesObj.filter(obj => {return obj.ref === ref});
  refNote[0].text = addTxt.value;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
});

addTitle.addEventListener('input', function(e){
  if (location.hash == domain){
    return;
  }
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  var ref = location.hash.slice(1, location.hash.length);
  var refNote = notesObj.filter(obj => {return obj.ref === ref});
  refNote[0].title = addTitle.value;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
});