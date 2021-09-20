export function addBackgroundToDom(targetTable, srcURL, backgroundName) {
    let htmlElements = generateBackgroundHtmlElements(srcURL, backgroundName);

    let tableRow = document.createElement("tr");
        
    let checkBoxCell = document.createElement("td");
    let imageCell = document.createElement("td");
    
    checkBoxCell.appendChild(htmlElements.checkbox);
    imageCell.appendChild(htmlElements.imageLabel);

    tableRow.appendChild(checkBoxCell);
    tableRow.appendChild(imageCell);


    targetTable.appendChild(tableRow);

    return tableRow;
}

function generateBackgroundHtmlElements(srcURL, backgroundName) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = backgroundName;
    

    let image = document.createElement("img");
    image.className = "background-image";
    image.src = srcURL;

    let imageLabel = document.createElement("label");
    imageLabel.htmlFor = backgroundName;
    imageLabel.appendChild(image);
    
    return { checkbox, imageLabel };
}