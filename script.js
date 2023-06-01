const accessKey = "2JSmPPXIOew2vtySdJ1tDjCFrQRLFBbvzICp0kwlZuc"

const formEL= document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore= document.getElementById("show-more-button");

let inputData = "";
let page = 1;


async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1)
    {
        searchResults.innerHTML = "";
    }

    results.map((resutl) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = resutl.urls.small;
        image.alt = resutl.alt_description;
        const imageLink = document.createElement('a');

        imageLink.href = results.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = resutl.alt_description  ;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);


    });
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }

}

formEL.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click",() => {
   
    searchImages();
})