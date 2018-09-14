document.addEventListener("DOMContentLoaded", hentJson);

let retter;
let dest = document.querySelector(".data_courses");
let kategoriFilter = "alle";


async function hentJson() {
    let myJsonData = await fetch("csvjson.json");
    retter = await myJsonData.json();

    visRetter();
}

//Nedestående del omhandler kun filtrering som endnu ikke er defineret

document.querySelectorAll(".menu-item").forEach(knap => {
    knap.addEventListener("click", filtrering)
});

function filtrering() {
    dest.textContent = "";
    kategoriFilter = this.getAttribute("data-kategori");

    visRetter();
}

//Filtrering Slut

function visRetter() {
    let temp = document.querySelector(".data_template");

    //løb menu igennem og lav en klon
    retter.forEach(ret => {
        if (ret.kategori == kategoriFilter || kategoriFilter == "alle") {
            let klon = temp.cloneNode(true).content;
            klon.querySelector("img").src = "img/sm/" + ret.billede + ".jpg";
            klon.querySelector("h2").textContent = ret.navn;
            klon.querySelector(".data_desription_short").textContent = ret.kortbeskrivelse;
            klon.querySelector(".data_description_long").textContent = ret.langbeskrivelse;
            klon.querySelector(".data_price").textContent = "Pris: " + ret.pris + "kr.";
            dest.appendChild(klon);
        }
    })
}
