function AllSelected() {
    convertFileTo();
}

function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}

function isSelected(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]').checked;
    console.log(source)


}

function download(format) {
    let final = {
        Result: format
    }
    let text = JSON.stringify(final)
    console.log(text)
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `filename.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadxml(format) {
    let final = `<?xml version="1.0" encoding="UTF-8"?>
    <results>
    ${format}
    </results>`
    let text = final
    console.log(final)
    let element = document.createElement('a');
    element.setAttribute('href', 'data:xml/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `filename.xml`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function downloadcsv(format) {
    let text = format
    let element = document.createElement('a');
    console.log(encodeURIComponent(text))
    console.log(encodeURI(text))
    element.setAttribute('href','data:charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `filename.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);


}