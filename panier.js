import { RequeteApi } from "./requete.js";

import { responsiveNav, shoppingIconNav } from "./main.js";

var getNombreProduits;
var getQuantiteTotal;
let prixPanierTotal;

let panier = localStorage.getItem("obj");
let panierJson = JSON.parse(panier);
let total = [];
let quantiteTableau = [];
// Initialisation tableau avec id des produits dans le panier pour envoie API
let products = [];

function getProduitID() {
  let defautPage = document.getElementById("page_defaut");
  let containerPanier = document.getElementById("panier");
  let PanierContenu = document.getElementById("panierContenu");

  if (panierJson) {
    for (let i = 0; i < panierJson.length; i++) {
      const getProduitIDs = new RequeteApi();
      getProduitIDs
        .getProduct(panierJson[i].produit)
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
          panierImage.setAttribute("alt", "appareil photo");

          let panierResumeDiv = document.createElement("div");
          panierProduit.appendChild(panierResumeDiv);
          panierResumeDiv.setAttribute("class", "ResumeDiv");

          let resumeTitreLink = document.createElement("a");
          panierResumeDiv.appendChild(resumeTitreLink);
          resumeTitreLink.setAttribute(
            "href",
            "produits.html?id=" + panierJson[i].produit
          );

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
          produitOption.innerHTML =
            "Type de lentille choisit : " + panierJson[i].option;

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

          // Ajout id produits au tableau
          products.push(panierJson[i].produit);

          //Calcul du prix total
          let totalPrice = panierJson[i].quantite * responseText.price;
          total.push(totalPrice);
          prixPanierTotal = total.reduce(myFunc);

          function myFunc(total, num) {
            return total + num;
          }
          let totalPanier = document.getElementById("prixTotal");
          totalPanier.innerHTML = prixPanierTotal + " €";

          //calcul de la quantité d'article
          getQuantiteTotal = parseInt(panierJson[i].quantite);

          quantiteTableau.push(getQuantiteTotal);
          getNombreProduits = quantiteTableau.reduce(myFunc2);

          function myFunc2(total, num) {
            return parseInt(total + num);
          }

          let quantitéTotal = document.getElementById("quantitéTotal");
          quantitéTotal.innerHTML = getNombreProduits;

          let pluriel = document.getElementById("pluriel");
          if (getNombreProduits > 1) {
            pluriel.innerHTML = "articles";
          } else {
            pluriel.innerHTML = "article";
          }
        })
        .catch((error) => {
          let panierVideText = document.getElementById("panierVideText");
          panierVideText.innerHTML = "Erreur de chargement du panier";

          let lienPanierVide = document.getElementById("lienPanierVide");
          lienPanierVide.innerHTML = "Recharger la page";
          lienPanierVide.setAttribute("href", "panier.html");
        });
    }
  }
}
window.onload = getProduitID();

//  ---------------- Validation formulaire

// Récupération des input du formulaire
let formulaire = document.forms["formulaire"];

// Initialisation objet contact pour envoie API
let contact = {};

formulaire["firstName"].addEventListener("change", function (e) {
  contact.firstName = this.value;
});
formulaire["lastName"].addEventListener("input", function (e) {
  contact.lastName = this.value;
});
formulaire["address"].addEventListener("change", function (e) {
  contact.address = this.value;
});
formulaire["city"].addEventListener("change", function (e) {
  contact.city = this.value;
});
formulaire["email"].addEventListener("change", function (e) {
  contact.email = this.value;
});

// Validation donné saisi
let btnValider = document.getElementById("valider");

btnValider.addEventListener("click", function(e){
  var erreurmessage ;
  let erreurText = document.getElementById('erreur')

  var inputs = formulaire 
  console.log(formulaire)

  for(let i=0; i<inputs.length; i++){
    if(!inputs[i].value){
      console.log(inputs.value)
      erreurmessage = "Veuillez renseigner tous les champs";
      inputs[i].focus()
      break
      
    }
  }

  if(erreurmessage){
    e.preventDefault();
    erreurText.innerHTML = erreurmessage
    return false
  }else{
    e.preventDefault();
  postData();
  }

})








// ------------------- FIN

const postData = () => {
  if (contact && products) {
    let data = {
      contact,
      products,
    };

    let datajson = JSON.stringify(data);
    let request = new RequeteApi();
    request.getProduct("", datajson).then((responseText) => {
      console.log(responseText);
      localStorage.setItem("id", responseText.orderId);
      localStorage.setItem("prixPanier", prixPanierTotal);
      document.location.href = "confirmation.html";
      console.log(responseText.orderId);
      let name = document.getElementById("name");
    });
  }
};

// Vider panier + pop up alert cutom
let btnPanierSupp = document.getElementById("btnPanier");
btnPanierSupp.addEventListener("click", function (e) {
  e.preventDefault();
  let box = document.getElementById("box");
  let body = document.getElementById("body");
  body.style.opacity = "0.5";
  body.style.zIndex = "1";
  box.style.visibility = "visible";
  box.style.opacity = "1";
  box.setAttribute("class", "alert");

  let confirmSupp = document.getElementById("confirmer");
  let annulSupp = document.getElementById("annuler");

  let delectPanier = () => {
    document.location.href = "index.html";
    localStorage.clear();
  };

  let cancelDelectPanier = () => {
    body.style.opacity = "1";
    body.style.zIndex = "1";
    box.style.visibility = "hidden";
  };

  confirmSupp.addEventListener("click", function (e) {
    delectPanier();
  });

  annulSupp.addEventListener("click", function (e) {
    cancelDelectPanier();
  });
});

// navigation responsive et onglet nombre de produit sur onglet shopping
(window.onload = responsiveNav()), (window.onload = shoppingIconNav());
