const images = document.getElementById("gallery");
const loadMoreButton = document.getElementById("load-more");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");

let currentPage = 1;
let currentSearch = "";

const main = async () => {
  
  let url = `https://api.unsplash.com/photos?page=${currentPage}`;

  if (currentSearch !== "") {
    url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(currentSearch)}&page=${currentPage}`;
  }

  let response = await fetch(url, {
    headers: {
      Authorization: "Client-ID gHEUN05WAX435CJpL33L5TM3abRTeVP5M0uycBmRJlM", 
    },
  });

  if (!response.ok) {
    throw new Error("Error!");
  }

  const result = await response.json();

  const photos = currentSearch !== "" ? result.results : result;

  photos.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.small;

    const imgElement = document.createElement("img");
    imgElement.className = "w-full h-auto mb-6 break-inside-avoid rounded-2xl";
    imgElement.src = imageUrl;
    imgElement.alt = id;

    images.appendChild(imgElement);
  });

  loadMoreButton.textContent = "Load more ↓";
  loadMoreButton.disabled = false;
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = searchInput.value.trim();
  if (value === "") return; 

  currentSearch = value;
  currentPage = 1;
  images.innerHTML = "";
  
  loadMoreButton.textContent = "loading ...";
  loadMoreButton.disabled = true;

  main();
});

loadMoreButton.addEventListener("click", async () => {
  currentPage++;
  loadMoreButton.textContent = "loading ...";
  loadMoreButton.disabled = true;
  await main();
});

main();
