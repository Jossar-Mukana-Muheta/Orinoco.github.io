import {
  RequetebddId
} from "./requete.js";

let icon = document.getElementById('iconPanier')

if (localStorage.length > 0) {

  icon.innerHTML = "*"
} else {
  icon.style.display = "none"
}
// navigation responsive
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav')
  var instances = M.Sidenav.init(elems, {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  })
})


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
    getProduitIDs
      .getInformationId(panierJson[i].produit)
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
        let quantiteProduit = parseInt(panierJson[i].quantite)

        quantiteTableau.push(quantiteProduit)
        let quantiteAddition = quantiteTableau.reduce(myFunc2)

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
      });
  }


}



window.onload = getProduitID();


// Vider panier 
let btnPanierSupp = document.getElementById('btnPanier')
btnPanierSupp.addEventListener('click', function (e) {
  alert("Confirmer suppression ?")
  if (alert) {
    localStorage.clear();
    btnPanierSupp.setAttribute('href', 'index.html')
  }

})