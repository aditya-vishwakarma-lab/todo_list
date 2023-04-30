function populateTable() {
  var itemListArrayString = localStorage.getItem('itemListArrayString');
  var itemListArary = JSON.parse(itemListArrayString);
  var tableBody = document.getElementById('my-table-body');

  itemListArary.forEach(function(element, index) {
    // console.log(`title: ${element[0]}\ndescription: ${element[1]}\nindex ${index+1}`);
    var newRow = tableBody.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    cell1.innerHTML = index+1;
    cell2.innerHTML = element[0];
    cell3.innerHTML = element[1];
    cell4.innerHTML = `<button type="button" class="btn btn-sm btn-primary" onclick="deleteItem(${index})" id = delete-row-${index}>Delete</button>`
  });
  console.log('inserted all tasks from the local storage to table');
}

function clearList() {

	var tableBody = document.getElementById('my-table-body');
	var rowCount = tableBody.rows.length;

	for (var i = rowCount - 1; i >= 0; i--) {
	    tableBody.deleteRow(i);
	}

	// console.log(localStorage.getItem('itemListArrayString'));
	var itemListArary = [];
	localStorage.setItem('itemListArrayString', JSON.stringify(itemListArary));
	// console.log(localStorage.getItem('itemListArrayString'));
	console.log('cleared the item list.')
}

function deleteItem(rowIndex) {

	var tableBody = document.getElementById('my-table-body');
	var rowCount = tableBody.rows.length;

	for (var i = rowCount - 1; i >= 0; i--) {
	    tableBody.deleteRow(i);
	}


	var itemListArrayString = localStorage.getItem('itemListArrayString');
	var itemListArary = JSON.parse(itemListArrayString);
	itemListArary.splice(rowIndex, 1);
	localStorage.setItem('itemListArrayString', JSON.stringify(itemListArary));

	populateTable();

	console.log(`deleted the ${rowIndex}th row from the table`);

	// var tableBody = document.getElementById('my-table-body');
	// tableBody.deleteRow(rowIndex);
}


function addItem() {
	var itemTitle = document.getElementById('title').value;
	var itemDescription = document.getElementById('description').value;
	if (itemTitle != '') {
		var itemListArrayString = localStorage.getItem('itemListArrayString');
		if (itemListArrayString != null) {
			var itemListArary = JSON.parse(itemListArrayString);
			itemListArary.push([itemTitle,itemDescription]);
			localStorage.setItem('itemListArrayString', JSON.stringify(itemListArary));
		} else {
			var itemListArary = [];
			itemListArary.push([itemTitle,itemDescription]);
			localStorage.setItem('itemListArrayString', JSON.stringify(itemListArary));
		}

		console.log(`added the task "title: ${itemTitle}, description: ${itemDescription}" to tasks_list`);

		var tableBody = document.getElementById('my-table-body');

		var newRow = tableBody.insertRow();
		var cell1 = newRow.insertCell(0);
		var cell2 = newRow.insertCell(1);
		var cell3 = newRow.insertCell(2);
		var cell4 = newRow.insertCell(3);
		var index = itemListArary.length
		cell1.innerHTML = index;
		cell2.innerHTML = itemTitle;
		cell3.innerHTML = itemDescription;
		cell4.innerHTML = `<button type="button" class="btn btn-sm btn-primary" onclick="deleteItem(${index})" id = delete-row-${index}>Delete</button>`

	} else {
		console.log("not adding this task to tasks_list because title field is empty");
	}
}

document.addEventListener('DOMContentLoaded', function () {
	populateTable();
});
