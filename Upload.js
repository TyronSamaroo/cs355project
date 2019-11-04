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
        res = reader.result
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
        a.Result.forEach(search => {

            output += `
                <div id= "displayedresults">
                    
                    <input id= "check${count}" type="checkbox" name="searchfiles" value=searchfiles onclick="isSelected(this)">
                    <hr>   
                    <div class= "list-group mb-4" id= "results${count}"> 
                        <li class="list-group-item list-group-item-info"> ${search.title}</li>
                        
                        <a class="list-group-item list-group-item-sucess" href="${search.url}" target="_blank">${search.url}</a>
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
        displayXML(file)
    }
    if (file.value.split('.')[1] == 'csv') {
        console.log("CSV FILE")
        displayCSV(file)
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