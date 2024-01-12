const iTunes = "https://itunes.apple.com/search?term=";
let searchForm=document.getElementById('form');
let searchBar=document.getElementById('searchbar')
let button=document.getElementById('searchbutton');
const searchResults = document.querySelector(".container");
const audioPlay = document.getElementById("audioplay");


searchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let value = searchBar.value
    console.log(value)


    fetch(iTunes +value, {
    method: "GET",
    headers: {"Content-Type": "application/json"}


        })

        .then((response) => {
            if (response.status == 200){
                return response.json();    
            } 
            else { console.log("Response Error")}
        })
        .then((parsedJson) => {
            const resultsArray = parsedJson.results;
            console.log(resultsArray);




           for (let i = 0; i<resultsArray.length; i++) {

            let songCard = document.createElement("div");
            songCard.classList.add("card")
            searchResults.appendChild(songCard);
// ALBUM ART 
            const imageTag = document.createElement("img");
            imageTag.classList.add("albumArt");
            imageTag.src = resultsArray[i].artworkUrl100;
            imageTag.setAttribute("data-id", resultsArray[i].previewUrl)
            songCard.appendChild(imageTag);


            /*  **THE CODE AT LINES 45-48 IS NOT WORKING - UNSURE WHY**
              const albumArt = resultsArray[i].artworkUrl100;
                const imageElement = document.createElement("img");
                albumArt.src = "albumArt";
                songCard.appendChild(albumArt);
            */

    // SONG NAME 
                const trackName = resultsArray[i].trackName;
                const songTitleElement = document.createElement("h3");
                songTitleElement.innerText = trackName;
                songCard.appendChild(songTitleElement);
//ARTIST NAME 
                const artistName = resultsArray[i].artistName;
                const artistElement = document.createElement("h2");
                artistElement.innerText = artistName;
                songCard.appendChild(artistElement);

            } 

        const albumArt = document.querySelectorAll(".albumArt")
        for (let album of albumArt){
            album.addEventListener("click", (e) => {
                console.log(e.target.dataset.id);
                audioPlay.src = e.target.dataset.id;
            })
        }
            

            //add and keep divs in here//


        }) 
    
})


