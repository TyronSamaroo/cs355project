//ConvertFile So It can be downloaded
function ConvertFileToJSON() {
    console.log("CONVERTING TO JSON")
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let format = [];

    for (var x = 1; x < checkboxes.length; x++) {
        //console.log(checkboxes[x])
        if (checkboxes[x].checked == true) {
            console.log(x + "OK")
            let resultag = document.getElementById(`check${x-1}`).nextElementSibling.nextElementSibling.childNodes;
            //console.log(resultag)
            console.log(resultag[1].textContent)
            console.log(resultag[3].textContent)
            console.log(resultag[5].textContent)
            let dataobject = {
                title: resultag[1].textContent,
                url: resultag[3].textContent,
                description: resultag[5].textContent
            }
            format.push(dataobject);
        }

    }

    download(format)



}

function ConvertFileToXML() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let format = '';
    console.log("CONVERTING")
    for (var x = 1; x < checkboxes.length; x++) {

        if (checkboxes[x].checked == true) {
            let resultag = document.getElementById(`check${x-1}`).nextElementSibling.nextElementSibling.childNodes;

            format += `<result>
                <title>${resultag[1].textContent}</title>
                <url>${resultag[3].textContent}</url>
                <description>${resultag[5].textContent}</description>
            </result> `
        }

    }
    console.log(format)
   

    downloadxml(format)

}

function ConvertFileToCSV() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let format =``;
    
    for (var x = 1; x < checkboxes.length; x++) {

        if (checkboxes[x].checked == true) {
            let resultag = document.getElementById(`check${x-1}`).nextElementSibling.nextElementSibling.childNodes;
            console.log(resultag)
            format +=`"${resultag[1].textContent}","${resultag[3].textContent}","${resultag[5].outerText}"\n`;
        }
        console.log("THIS IS THE FORMAT BEFORE DOWNLOAD" + format)
    }
    downloadcsv(format)
}