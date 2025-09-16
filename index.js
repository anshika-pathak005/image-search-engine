const searchForm = document.querySelector("#Search_form")
const searchBox = document.querySelector("#Search_box")
const searchResult = document.querySelector(".search_results")
const showMore = document.querySelector(".show_more")

let keyword = "";
let page = 1;
const APIkey = "YOUR_ACCESS_KEY_HERE";


async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${APIkey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data)

    //mapping each image from our response

    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((results) => {
        const image = document.createElement("img");
        image.src = results.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMore.style.display = "block"

}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImages();
})

showMore.addEventListener("click",() => {
    page++;
    searchImages();
})