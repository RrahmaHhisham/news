let nextDon = document.getElementById("next");
let prevDon = document.getElementById("prev");
let carouselDom = document.querySelector(".carousel-banner");
let listItemDom = document.querySelector(".carousel-banner .list");
let thumbnailDom = document.querySelector(".content-carousel .thumbnail");

nextDon.onclick = function () {
  showSlider("next");
};

prevDon.onclick = function () {
  showSlider("prev");
};

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runAutoRun = setTimeout(() => {
  nextDon.click();
}, timeAutoNext);
function showSlider(type) {
  let itemSlider = document.querySelectorAll(".carousel-banner .list .item");
  let itemThumbnail = document.querySelectorAll(
    ".carousel-banner .thumbnail .item"
  );
  let thumbnailDom = document.querySelector(".carousel-banner .thumbnail");

  if (type === "next") {
    listItemDom.appendChild(itemSlider[0]);
    thumbnailDom.appendChild(itemThumbnail[0]);
    carouselDom.classList.add("next");
  } else {
    let positionLesItem = itemSlider.length - 1;
    listItemDom.prepend(itemSlider[positionLesItem]);
    thumbnailDom.prepend(itemThumbnail[positionLesItem]);
    carouselDom.classList.add("prev");
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runAutoRun);
  runAutoRun = setTimeout(() => {
    nextDon.click();
  }, timeAutoNext);
}

// end banner
// ////////////////////////////////////////////////////////////////////////////////////////

const abiKey = "fdf2f6c7b3044e5f8c18c2dd18790306";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchData(query) {
  const res = await fetch(`${url}${query}&apiKey=${abiKey}`);
  const data = await res.json();
  return data;
}

fetchData("all").then((data) => renderMain(data.articles));

async function search(query) {
  const data = await fetchData(query);
  renderMain(data.articles);
}

// render news
function renderMain(arr) {
  let mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += `
        <div class="card">
            <a href = ${arr[i].url}>
                <img src=${arr[i].urlToImage}>
                <div class="card-title">
                    <h4>${arr[i].title}</h4>
                    <span>
                        <p>${arr[i].source.name}</p>
                        
                        <p>${new Date(
                          arr[i].publishedAt
                        ).toLocaleDateString()}</p>
                    </span>
                </div>
                <div class="desc">
                    ${arr[i].description}
                </div>
            </a>
        </div>
        `;
    }
  }

  document.querySelector(".section-cards").innerHTML = mainHTML;
}
// end news
// ///////////////////////////////////////////////////////////////////////////////////////////////

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("click", async (e) => {
  e.preventDefault();

  const data = await search(searchInput.value); // Call inputSearch with searchInput.value
  renderMain(data.articles);
});

async function Search(query) {
  const data = await fetchData(query);
  renderMain(data.articles);

  return data;
}

// //////////////////////////////////////////////////////////////////////////////////////////////

const btnScrollToTop = document.getElementById("btnScrollToTop");

btnScrollToTop.addEventListener("click", function () {
  // window.scrollTo(0, 0)

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
