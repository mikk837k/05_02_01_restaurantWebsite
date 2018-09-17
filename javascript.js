document.addEventListener("DOMContentLoaded", hentJson);

let retter;
let dest = document.querySelector(".data_courses");
let kategoriFilter = "alle";
let modal = document.querySelector("#modal");


async function hentJson() {
    let myJsonData = await fetch("myjson.json");
    retter = await myJsonData.json();

    visRetter();
}

//menu navigation på siden

document.querySelector(".box1").addEventListener("click", function () {
    window.location.href = "#aboutusPage";
})
document.querySelector(".box2").addEventListener("click", function () {
    window.location.href = "#menuPage";
})
document.querySelector(".box3").addEventListener("click", function () {
    window.location.href = "#bookingPage";
})

document.querySelector(".backToTop").addEventListener("click", function () {
    window.location.href = "#frontpage";
})


//Nedestående del omhandler kun filtrering som endnu ikke er defineret

document.querySelectorAll(".menu-item").forEach(knap => {
    knap.addEventListener("click", filtrering)
});

function filtrering() {
    dest.textContent = "";
    kategoriFilter = this.getAttribute("data-kategori");

    visRetter();
}

//MODEL VISNING START

function visModal(retterne) {
    modal.classList.add("show");
    modal.querySelector(".modal-navn").textContent = retterne.navn;
    modal.querySelector(".modal-billede").src = "img/lrg/" + retterne.billede + ".jpg";
    modal.querySelector(".modal-billede").alt = "Foto af " + retterne.navn;
    modal.querySelector(".data_description_long").textContent = retterne.langbeskrivelse;
    modal.querySelector("div").addEventListener("click", hideModal);
}

function hideModal() {
    modal.classList.remove("show");
}

//MODAL VISNING SLUT


//Filtrering Slut

function visRetter() {
    let temp = document.querySelector(".data_template");

    //løb menu igennem og lav en klon
    retter.forEach(ret => {
        if (ret.kategori == kategoriFilter || kategoriFilter == "alle") {
            let klon = temp.cloneNode(true).content;
            klon.querySelector("img").src = "img/sm/" + ret.billede + ".jpg";
            klon.querySelector("img").addEventListener("click", () => {
                visModal(ret);
            });
            klon.querySelector("h2").textContent = ret.navn;
            klon.querySelector(".data_desription_short").textContent = ret.kortbeskrivelse;
            klon.querySelector(".data_price").textContent = "Pris: " + ret.pris + "kr.";
            dest.appendChild(klon);
        }
    })
}
