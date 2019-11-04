function displayFile() {

    var file = document.getElementById('uploadedFile');
    console.log(file.files.item(0));
    var filename = file.files.item(0).name;
    let url = `${filename}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "application/xml");
            //document.getElementById('output').textContent = data;
            console.log(xml)
            results(xml);
        });
    output = `
     <a href="${file.files.item(0).name}" target="_blank">${file.files.item(0).name}</a>
     <p> \ </p>
    `
    document.getElementById('output').innerHTML = output;
}

function results(xml) {
    let title = document.getElementById('title');
    let url = document.getElementById('url');
    let discription = document.getElementById('discription');
    //console.log(title.firstChild.nodeValue);
}


function displayJSON(file) {

    var filename = file.files.item(0).name;
    console.log(filename)

    let url = `${filename}`;
    console.log("URL " + url)
    fetch(url)
        .then(res => res.json())
        .then(data => {


            // data.items.forEach(search =>{ })
            let output = ''
            count = 0;
            data.Result.forEach(search => {
                output += `
                        <div id= "displayedresults">
                        
                        <input id= "check${count}" type="checkbox" name="searchfiles" value=searchfiles onclick="isSelected()">
                        <hr> 
                        <div class= "list-group mb-4" id= "result${count}"> 
                            <li class="list-group-item list-group-item-info">${search.title}</li>
                            
                            <a class="list-group-item list-group-item-sucess" href="${search.url}" target="_blank">${search.url}</a>
                            <li class="list-group-item list-group-item-warning">${search.description}</li>
                          
                        </div>`
                count++;
            })

            document.getElementById('output').innerHTML = output;
        })

}

function displayXML(file) {
    var filename = file.files.item(0).name;
    let url = `${filename}`;
    console.log("URL" + url)
    fetch(url)
        .then(res => res.text())
        .then(data => {
            console.log(data)
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(data, "text/xml");
            console.log(xmlDoc)
            let length = xmlDoc.getElementsByTagName("result").length;
            let output = ``;
            for (let i = 0; i < length; i++) {
                output += `
                <div id= "displayedresults">
                        
                        <input id= "check${i}" type="checkbox" name="searchfiles" value=searchfiles onclick="isSelected()">
                        <hr> 
                        <div class= "list-group mb-4" id= "result${i}"> 
                            <li class="list-group-item list-group-item-info">${xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue}</li>
                            
                            <a class="list-group-item list-group-item-sucess" href="${xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue}" target="_blank">${xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue}</a>
                            <li class="list-group-item list-group-item-warning">${xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue}</li>
                          
                        </div>`
            }
            document.getElementById('output').innerHTML = output;


        })

}

function displayCSV(file) {
    var filename = file.files.item(0).name;
    let url = `${filename}`;
    console.log("URL" + url)
    fetch(url)
        .then(res => res.text())
        .then(data => {
            console.log(data)
            let lines = data.split('\n');
            console.log(lines)
            output = '';
            for (let i = 0; i < lines.length - 1; i++) {
                let results = lines[i].split(',');
                output += `
                <div id= "displayedresults">
                        
                        <input id= "check${i}" type="checkbox" name="searchfiles" value=searchfiles onclick="isSelected()">
                        <hr> 
                        <div class= "list-group mb-4" id= "result${i}"> 
                            <li class="list-group-item list-group-item-info">${results[0]}</li>
                            
                            <a class="list-group-item list-group-item-sucess" href="${results[1]}" target="_blank">${results[1]}</a>
                            <li class="list-group-item list-group-item-warning">${results[2]}</li>
                          
                        </div>`
            }



            document.getElementById('output').innerHTML = output;


        })

}