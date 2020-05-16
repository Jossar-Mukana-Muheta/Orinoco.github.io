import {
  RequetebddId,
  PostRequette
} from "./requete.js";

import {
  responsiveNav,
  shoppingIconNav
} from './main.js'

var quantiteAddition
var quantiteProduit



let panier = localStorage.getItem("obj");
let panierJson = JSON.parse(panier);
let total = [];
let quantiteTableau = []



function getProduitID() {
  let defautPage = document.getElementById("page_defaut");
  let containerPanier = document.getElementById("panier");
  let PanierContenu = document.getElementById("panierContenu");
  let totalite;

  for (let i = 0; i < panierJson.length; i++) {
    const getProduitIDs = new RequetebddId();
    getProduitIDs.getInformationId(panierJson[i].produit)
      .then((responseText) => {
        containerPanier.style.display = "block";
        defautPage.style.display = "none";

        let panierProduit = document.createElement("div");
        PanierContenu.appendChild(panierProduit);
        panierProduit.setAttribute("class", "panierProduit");

        let containerImage = document.createElement("div");
        panierProduit.appendChild(containerImage);
        containerImage.setAttribute("class", "containerImage");

        let panierImage = document.createElement("img");
        containerImage.appendChild(panierImage);
        panierImage.setAttribute("src", responseText.imageUrl);
        panierImage.setAttribute("alt", "appareil photo")

        let panierResumeDiv = document.createElement("div");
        panierProduit.appendChild(panierResumeDiv);
        panierResumeDiv.setAttribute("class", "ResumeDiv");

        let resumeTitreLink = document.createElement("a")
        panierResumeDiv.appendChild(resumeTitreLink)
        resumeTitreLink.setAttribute("href",
          "produits.html?id=" + panierJson[i].produit)

        let resumeTitre = document.createElement("p");
        resumeTitreLink.appendChild(resumeTitre);
        resumeTitre.setAttribute("class", "resumeTitre");
        resumeTitre.innerHTML = responseText.name;



        let resumeText = document.createElement("p");
        panierResumeDiv.appendChild(resumeText);
        resumeText.setAttribute("class", "resumeText");
        resumeText.innerHTML = responseText.description;

        let produitOption = document.createElement("p");
        panierResumeDiv.appendChild(produitOption);
        produitOption.setAttribute("class", "produitOption");
        produitOption.innerHTML = "Type de lentille choisit : " + panierJson[i].option;

        let produitQuantite = document.createElement("p");
        panierResumeDiv.appendChild(produitQuantite);
        produitQuantite.setAttribute("class", "produitQuantite");
        produitQuantite.innerHTML = "Qté : " + panierJson[i].quantite;

        let panierPrixDiv = document.createElement("div");
        panierProduit.appendChild(panierPrixDiv);
        panierPrixDiv.setAttribute("class", "prix");

        let panierPrix = document.createElement("p");
        panierPrixDiv.appendChild(panierPrix);
        panierPrix.setAttribute("class", "prixPanier");
        panierPrix.innerHTML = responseText.price + " €";


        //Calcul du prix total 
        let totalPrice = panierJson[i].quantite * responseText.price;
        total.push(totalPrice)
        totalite = total.reduce(myFunc)

        function myFunc(total, num) {
          return total + num;
        }
        let totalPanier = document.getElementById('prixTotal')
        totalPanier.innerHTML = totalite + " €"


        //calcul de la quantité d'article
        quantiteProduit = parseInt(panierJson[i].quantite)

        quantiteTableau.push(quantiteProduit)
        quantiteAddition = quantiteTableau.reduce(myFunc2)

        function myFunc2(total, num) {
          return parseInt(total + num)
        }

        let quantitéTotal = document.getElementById('quantitéTotal')
        quantitéTotal.innerHTML = quantiteAddition

        let pluriel = document.getElementById('pluriel')
        if (quantiteAddition > 1) {
          pluriel.innerHTML = "articles"
        } else {
          pluriel.innerHTML = "article"
        }




      })
      .catch((error) => {
        let panierVideText = document.getElementById('panierVideText')
        panierVideText.innerHTML = "Erreur de chargement du panier"

        let lienPanierVide = document.getElementById('lienPanierVide')
        lienPanierVide.innerHTML = "Recharger la page"
        lienPanierVide.setAttribute('href',
          'panier.html')
      });
  }




}




window.onload = getProduitID();
//Validation formulaire 


// récupération élément produit 
let products = []
for (let i = 0; i < panierJson.length; i++) {

  // Création tableau products
  products.push(panierJson[i].produit)



}

// récupération élement formulaire

let formulaire = document.getElementById('formulaire')












let valider = document.getElementById('valider')

//Valider panier
valider.addEventListener('click', function (e) {



})

// Vider panier 
let btnPanierSupp = document.getElementById('btnPanier')
btnPanierSupp.addEventListener('click', function (e) {
  var r = confirm("Confirmer suppression ?")
  if (r == true) {
    localStorage.clear();
    btnPanierSupp.setAttribute('href', 'index.html')
  } else {

  }

})

// navigation responsive et onglet nombre de produit sur onglet shopping
window.onload = responsiveNav(), window.onload = shoppingIconNav()