// This uses google search api to return result to page

document.getElementById('search-param').addEventListener('submit', getResults);

function getResults(e) {
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
                        <li class="list-group-item list-group-item-info">${search.title}</li>
                        
                        <a class="list-group-item list-group-item-sucess" href="${search.link}" target="_blank">${search.link}</a>
                        <li class="list-group-item list-group-item-warning">${search.snippet}</li>
                      
                    </div>
                </div>
                `;
                count++;
            })
            document.getElementById('output').innerHTML = output;
        })

}