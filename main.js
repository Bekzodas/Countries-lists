const countries = document.querySelector("#countries");
const myModal = document.querySelector("#myModal");
const modalTitle = document.querySelector("#exampleModalLabel");

const loadingHTML = `
<div class="loading">
<div class="loading_skeleton">
<div class="loading_title"></div>
<div class="loading_description"></div>
</div>
</div>
`;
const errorHTML = `
<div class="card text-danger border-danger p-3 shadow">Error in Fetch</div>
`;
let url = "https://restcountries.com/v3.1/all";

const getCon = async () => {
  let res = await axios.get(url);
  return res.data;
};
function search(region) {
  if (region === "all") {
    url = "https://restcountries.com/v3.1/all";
  } else url = `https://restcountries.com/v3.1/region/${region}`;
  setConuntries();
}

const modalOpen = async (value) => {
  myModal.innerHTML = value;
  let res = await axios.get(`https://restcountries.com/v3.1/name/${value}`);
  try {
    res.data.map((item) => {
      myModal.innerHTML = `
        <div class="d-flex  gap-4">
        <img class="modal_images w-50 rounded-3 object-fit-cover" src="${item.flags.png}" alt="" />
        <div>
                <p>Continents: <span class="fw-bold">${item.region}</span></p>
        <p>Capital: <span class="fw-bold">${item.capital}</span></p>
        <p>Languages: <span class="fw-bold">${item.languages.ara}</span></p>
        <p>Maps: <a href="${item.maps.googleMaps}" class="fw-bold text-primary text-decoration-none">Maps</a></p>
        <p>Region: <span class="fw-bold">${item.region}</span></p>
        <p>Fifa: <span class="fw-bold">${item.fifa}</span></p>
        </div>
        </div>
        `;
    });
  } catch (error) {
    console.log(error);
  }
};

const setConuntries = async () => {
  try {
    countries.innerHTML = loadingHTML;
    let res = await getCon();
    countries.innerHTML = "";
    res.map((item) => {
      countries.innerHTML += `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="shadow p-2 rounded-3 bg-light h-100" 
            >
                <img class="images w-100 rounded-3" src="${item.flags.png}" alt="" />
                <div class="text-center">
                <p class="fs-2 fw-bold">${item.name.common}</p>
                <button
                type="button"
                class="btn btn-outline-dark fs-5 w-50 fw-bold py-1 mb-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onclick="modalOpen('${item.name.common}')";
                >
                Information
                </button>
                </div>
            </div>
        </div>
        `;
    });
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  setConuntries();
};
