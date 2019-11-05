function displayUploadedFileNormalJson() {
    var file = document.getElementById("uploadedFile");
    console.log(file.value.split('.')[1]);
    if (file.value.split('.')[1] == 'json') {
        console.log("JSON FILE")

    }
}

function handleChange() {
    var file = document.getElementById('uploadedFile');



}

function displayUploadedFile() {
    let res;
    var file = document.getElementById("uploadedFile");
    console.log(file.files.item(0));
    var filename = file.files.item(0).name;
    let reader = new FileReader();
    reader.readAsText(file.files.item(0));
    reader.onload = (e) => {
        res = `${reader.result}`
        console.log("upload file" + res)
        uploadedString(res)
    }


}

function uploadedString(res) {

    var file = document.getElementById("uploadedFile");
    //console.log(res);
    //console.log(file.value.split('.')[1]);
    //console.log(file.value)
    if (file.value.split('.')[1] == 'json') {
        console.log("JSON FILE")
        console.log(res)
        let a = JSON.parse(res);
        console.log(a.Result)
        count = 0;
        output= '';
        a.Result.forEach(search => {

            output += `
                <div id= "displayedresults">
                    
                    <input id= "check${count}" type="checkbox" name="searchfiles" value=searchfiles onclick="isSelected(this)">
                    <hr>   
                    <div class= "list-group mb-4" id= "results${count}"> 
                        <li class="list-group-item list-group-item-info"> ${search.title}</li>
                        
                        <a class="list-group-item list-group-item-success" href="${search.url}" target="_blank">${search.url}</a>
                        <li class="list-group-item list-group-item-warning"> ${search.description}</li>
                      
                    </div>
                </div>
                `;
            count++;
        })
        document.getElementById('output').innerHTML = output;
        //JSON.stringify(res)
        //console.log(res)
        //readJSON(file)
        //postJSON(file)
        //displayJSON(file)
    }
    if (file.value.split('.')[1] == 'xml') {
        console.log("XML FILE")
        console.log(res)

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(res, "text/xml");
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
                            
                            <a class="list-group-item list-group-item-success" href="${xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue}" target="_blank">${xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue}</a>
                            <li class="list-group-item list-group-item-warning">${xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue}</li>
                          
                        </div>`
        }
        document.getElementById('output').innerHTML = output;


        //let a = JSON.parse(res);
        //console.log(a.Result)
        //displayXML(file)
    }
    if (file.value.split('.')[1] == 'csv') {
        console.log("CSV FILE");
        
        console.log("Resonpse " + res);
        console.log(encodeURIComponent(res))
        console.log(res.length)
        //res = res.trim()
        console.log(res.length)
        //res = res.substring(1,res.length-1)
        console.log("new " + res)
        let lines = res.split(/\n/);
        console.log(lines)
        console.log("LINES " + lines[0])
        console.log("LINES " + lines[1])
        output = ``;
        for (let i = 0; i < lines.length - 1; i++) {
            let results = lines[i].split(/","/);
            console.log("RESULTS " + results)
            output += `
            <div id= "displayedresults">

                    <input id= "check${i}" type="checkbox" name="searchfiles" value=searchfiles onclick="isSelected()">
                    <hr> 
                    <div class= "list-group mb-4" id= "result${i}"> 
                        <li class="list-group-item list-group-item-info">${results[0]}</li>

                        <a class="list-group-item list-group-item-success" href="${results[1]}" target="_blank">${results[1]}</a>
                        <li class="list-group-item list-group-item-warning">${results[2]}</li>

                    </div>`
        }
        //console.log("CSV RESULT" + output)



        document.getElementById('output').innerHTML = output;


    }
}

function getUpload(e) {
    e.preventDefault();
    let q = document.getElementById('searchfield').value;
    output = ``;
    fetch(`https://www.googleapis.com/customsearch/v1?cx=005328335594563973105:loxqirrkk08&key=AIzaSyCQ2Wnm30rrgRQ1Zknyk1XGAYljRYlo6do&q=${q}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log(data.items);
            count = 0;
            data.items.forEach(search => {

                output += `
                <div id= "displayedresults">
                    
                    <input id= "check${count}" type="checkbox" name="searchfiles" value=searchfiles onclick="isSelected(this)">
                    <hr>   
                    <div class= "list-group mb-4" id= "results${count}"> 
                        <li class="list-group-item list-group-item-info"> ${search.title}</li>
                        
                        <a class="list-group-item list-group-item-sucess" href="${search.link}" target="_blank">${search.link}</a>
                        <li class="list-group-item list-group-item-warning"> ${search.snippet}</li>
                      
                    </div>
                </div>
                `;
                count++;
            })
            document.getElementById('output').innerHTML = output;
        })

}