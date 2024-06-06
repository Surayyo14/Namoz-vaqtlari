"use strict";

const regions = [...provencie];

// Dinamik variantlarni yaratish
function renderOptions() {
  const regionSelect = $("#region");
  regions.sort();
  regions.forEach((item) => {
    const option = createElement("option", "item-option", item);
    option.value = item;
    option.textContent = item; // option elementiga text qo'shish
    regionSelect.appendChild(option);
  });
}

getData("toshkent");
renderOptions();

$("#region").addEventListener("change", (e) => {
  e.preventDefault();
  const city = e.target.value;
  localStorage.setItem("region", city);

  $("#city").innerHTML = city;

  switch (city.toLowerCase()) {
    case "farg'ona":
      getData("qo'qon");
      break;
    case "qashqadaryo":
      getData("qarshi");
      break;
    case "surxondaryo":
      getData("termiz");
      break;
    case "xorazm":
      getData("urganch");
      break;
    case "sirdaryo":
      getData("guliston");
      break;
    case "toshkent":
      getData("toshkent");
      break;
    case "samarqand":
      getData("samarqand");
      break;
    case "jizzax":
      getData("jizzax");
      break;
    case "buxoro":
      getData("buxoro");
      break;
    case "namangan":
      getData("namangan");
      break;
    case "andijon":
      getData("andijon");
      break;
    default:
      getData(city);
  }
});

// Request API
async function getData(select) {
  const response = await fetch(
    `https://islomapi.uz/api/present/day?region=${select}`
  );
  const result = await response.json();
  localStorage.setItem("data", JSON.stringify(result));
  renderData();
}

// Render data
function renderData() {
  const data = JSON.parse(localStorage.getItem("data"));

  if (!data) return;

  console.log(data);

  const {
    region,
    date,
    times: { asr, hufton, peshin, quyosh, shom_iftor, tong_saharlik },
  } = data;

  $("#city").innerHTML = region; // Viloyat
  $(".date").innerHTML = date; // Sana
  $a(".card-time")[0].innerHTML = tong_saharlik;
  $a(".card-time")[1].innerHTML = quyosh;
  $a(".card-time")[2].innerHTML = peshin;
  $a(".card-time")[3].innerHTML = asr;
  $a(".card-time")[4].innerHTML = shom_iftor;
  $a(".card-time")[5].innerHTML = hufton;
}
renderData();


// clock function
function clock() {
    setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      $("#hour").innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }
  clock();