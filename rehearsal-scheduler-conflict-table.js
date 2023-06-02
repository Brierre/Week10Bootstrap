/* 
Castmember is the team name

Conflict is the individual unit on the team
*/

class Conflict {
    constructor(conflictDate, conflictName) {
        this.conflictDate = conflictDate;
        this.conflictName = conflictName;
    }

}

class Castmember { 
    constructor(id, castmemberName) {
        this.id = id;
        this.castmemberName = castmemberName;
        this.conflicts = []; //an empty array of castmember conflicts to which more can be added
    }

    addConflict(conflict) {
        this.conflicts.push(conflict);
    }

    deleteConflict(conflict) {
        let index = this.conflicts.indexOf(conflict);
        this.conflicts.splice(index, 1);
    }
}

let castmembers = []; //an empty array of castmember
let castmemberId = 0;

onClick('new-castmember', () => {
    castmembers.push(new Castmember(castmemberId++, getValue('new-castmember-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let castmemberDiv = document.getElementById('castmembers');
    clearElement(castmemberDiv);
    for (castmember of castmembers) {
        let table = createCastmemberTable(castmember);
        let title = document.createElement('h2');
        title.innerHTML = castmember.castmemberName;
        title.appendChild(createDeleteCastmemberButton(castmember));
        castmemberDiv.appendChild(title);
        castmemberDiv.appendChild(table);
        for (conflict of castmember.conflicts) {
            createConflictRow(castmember, table, conflict);
        }
    }
}

function createConflictRow(castmember, table, conflict) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = conflict.conflictDate;
    row.insertCell(1).innerHTML = conflict.conflictName;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(castmember, conflict));
}

function createDeleteRowButton(castmember, conflict) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = castmember.conflicts.indexOf(conflict);
        castmember.conflicts.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteCastmemberButton(castmember) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Castmember';
    btn.onclick = () => {
        let index = castmembers.indexOf(castmember);
        castmembers.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewConflictButton(castmember) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        castmember.conflicts.push(new Conflict(getValue(`conflictDate-input-${castmember.id}`), getValue(`conflictName-input-${castmember.id}`)));
        drawDOM();
    };
    return btn;
}

function createCastmemberTable(castmember) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let conflictDateColumn = document.createElement('th');
    let conflictNameColumn = document.createElement('th');
    let blankColumn = document.createElement('th');
    conflictDateColumn.innerHTML = 'Conflict Date';
    conflictNameColumn.innerHTML = 'Conflict Name';
    blankColumn.innerHTML = '';
    row.appendChild(conflictDateColumn);
    row.appendChild(conflictNameColumn);
    row.appendChild(blankColumn);


    let formRow = table.insertRow(1);
    let conflictDateTh = document.createElement('th');
    let conflictNameTh = document.createElement('th');
    let createTh = document.createElement('th');

    let conflictDateInput = document.createElement('input');
    conflictDateInput.setAttribute('id', `conflictDate-input-${castmember.id}`);
    conflictDateInput.setAttribute('type', 'text');
    conflictDateInput.setAttribute('class', 'form-control');

    let conflictNameInput = document.createElement('input');
    conflictNameInput.setAttribute('id', `conflictName-input-${castmember.id}`);
    conflictNameInput.setAttribute('type', 'text');
    conflictNameInput.setAttribute('class', 'form-control');

    let newConflictButton = createNewConflictButton(castmember);
    conflictDateTh.appendChild(conflictDateInput);
        conflictNameTh.appendChild(conflictNameInput);
        createTh.appendChild(newConflictButton);
        formRow.appendChild(conflictDateTh);
        formRow.appendChild(conflictNameTh);
        formRow.appendChild(createTh);
        return table;
    }

    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }




