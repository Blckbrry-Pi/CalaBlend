function addPhonemeGroupToDom(phonemeGroup, phonemeGroupTable) {
    let tableRow = document.createElement("tr");
        
    let checkBoxCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let contentsCell = document.createElement("td");
    
    checkBoxCell.appendChild(phonemeGroup.htmlCheckbox);
    nameCell.appendChild(phonemeGroup.htmlName);
    contentsCell.appendChild(phonemeGroup.htmlContents);

    tableRow.appendChild(checkBoxCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(contentsCell);


    phonemeGroupTable.appendChild(tableRow);
}

export function addPhonemeGroupsToDom(phonemeGroupObjects, phonemeGroupTable) {
    phonemeGroupObjects.forEach((phonemeGroup) => addPhonemeGroupToDom(phonemeGroup, phonemeGroupTable));
}