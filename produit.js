import {
    RequetebddId
} from "./requete.js";

import {
    responsiveNav,
    shoppingIconNav
} from './main.js'



//Recuperer id passé dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const pageProduit = document.getElementById("produits_page");
const pageDefault = document.getElementById("page_defaut");

pageProduit.style.display = "none";



// Récuperer et affiché élement correspondant à l'ID
function getProduitID() {
    const getProduitIDs = new RequetebddId();
    getProduitIDs.getInformationId(id)
        .then((responseText) => {
            const titre = responseText.name;
            const image = responseText.imageUrl;
            const prix = responseText.price;
            const description = responseText.description;
            const optionList = responseText.lenses;

            let titreProduit = document.getElementById("titre_produit");
            let imgProduitChoisit = document.getElementById("produit_choisit");
            let descriptionProduitChoisit = document.getElementById("description");
            let prixProduitChoisit = document.getElementById("prix");
            let lentille = document.getElementById("lentille-select");

            // récuperer option + affichage liste déroulante
            const optionTableau = optionList;
            for (let i = 0; i < optionTableau.length; i++) {
                let option = document.createElement("option");
                lentille.appendChild(option);
                option.setAttribute("value", optionTableau[i]);
                option.innerHTML = optionTableau[i];
            }

            imgProduitChoisit.setAttribute("src", image);
            prixProduitChoisit.innerHTML = prix + " €";
            descriptionProduitChoisit.innerHTML = description;
            titreProduit.innerHTML = titre;

            pageProduit.style.display = "flex";
            pageDefault.style.display = "none";
        })
        .catch(() => {



        });
}

window.onload = getProduitID();

//   Vérifier Option + quantités
const optionChoice = document.getElementById("lentille-select");
const btnValidation = document.getElementById("btnPanier");
const quantiteChoice = document.getElementById("quantite");

let optionChoiceValue = "";
let quantiteChoiceValue = "1";

optionChoice.addEventListener("change", function (e) {
    optionChoiceValue = e.target.value;
    if (optionChoiceValue != "ko") {
        btnValidation.removeAttribute("disabled");
    } else {
        btnValidation.setAttribute("disabled", "");
    }
});

quantiteChoice.addEventListener("change", function (e) {
    quantiteChoiceValue = e.target.value;
});

// Stockage quantité + option dans local storage
btnValidation.addEventListener("click", function (e) {
    if (localStorage.getItem('obj')) {

        console.log(localStorage.getItem('obj'))

        let dejson = JSON.parse(jsonobjet)


        let obj = {
            produit: id,
            option: optionChoiceValue,
            quantite: quantiteChoiceValue,
        };


        dejson.push(obj);

        let objLinea = JSON.stringify(dejson);
        localStorage.setItem("obj", objLinea);




        btnValidation.setAttribute("href", "panier.html");


    } else {

        let article = [];




        let obj = {
            produit: id,
            option: optionChoiceValue,
            quantite: quantiteChoiceValue,
        }



        article.push(obj);

        let objLinea = JSON.stringify(article);
        localStorage.setItem("obj", objLinea);

        btnValidation.setAttribute("href", "panier.html");




    }

});

// navigation responsive et onglet nombre de produit sur onglet shopping
window.onload = responsiveNav(), shoppingIconNav()