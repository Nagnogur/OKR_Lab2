const bu = document.getElementById("button1");
var n = 0;


function addRow() {

    var tableRef = document.getElementById('table1').getElementsByTagName('tbody')[0];

// Insert a row in the table at the last row
var newRow   = tableRef.insertRow(0);

// Insert a cell in the row at index 0
var newCell  = newRow.insertCell(0);

// Append a text node to the cell
var newButton  = document.createElement("button");
newButton.innerHTML = "<h1>New note" + n + "</h1>";
n++;
newCell.appendChild(newButton);
}