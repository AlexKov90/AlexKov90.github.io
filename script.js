const API_URL =
  "https://polar-brushlands-33727.herokuapp.com/http://www.mrsoft.by/data.json";

let data = null;

const getList = () =>
  new Promise((resolve, reject) => {
    if (data) {
      resolve(data);
      return;
    }

    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => resolve(result.data), reject);
  });

getList().then((result) => {
  data = result;
});

const getSearchInputValue = () => document.getElementById("search-input").value;

document
  .getElementById("search-by-length-button")
  .addEventListener("click", function () {
    getList().then((list) => {
      let search = getSearchInputValue();
      let filteredData = list.filter((word) => word.length > parseInt(search));

      document.getElementById("result").innerText = filteredData;
    });
  });

document
  .getElementById("search-by-substring-button")
  .addEventListener("click", function () {
    getList().then((list) => {
      let search = getSearchInputValue();
      let isCaseSensitive = document.getElementById("case-sensitive-checkbox").checked;
      let filteredData = null;
      if(isCaseSensitive){
        filteredData = list.filter((item) => item.includes(search));
      }else{
        filteredData = list.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
      };

      document.getElementById("result").innerText = filteredData;
    });
  });
