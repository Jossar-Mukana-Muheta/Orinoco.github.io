import { RequetebddId } from "./requete.js";

let panier = localStorage.getItem("obj");
let panierJson = JSON.parse(panier);

let defautPage = document.getElementById("page_defaut");
let panierImage = document.getElementById("panierImage");
let panierResume = document.getElementById("panierResume");
let panierPage = document.getElementById("panier");
let total = document.getElementById("total");

function getProduitID() {
  const getProduitIDs = new RequetebddId();
  getProduitIDs.getInformationId(panierJson.produit).then((responseText) => {
    panierPage.style.display = "block";
    defautPage.style.display = "none";
    panierImage.setAttribute("src", responseText.imageUrl);
    panierResume.innerHTML = responseText.description;
  });
}

window.onload = getProduitID();

// supprimer panier
/*suppPanier = () => {
    btnPanier = document.getElementById('btnPanier')
    localStorage.clear()
    btnPanier.setAttribute('href', 'panier.html')
    panier.removeAttribute('class')
    panier.removeChild(prix)
    panier.removeChild(image)


}

defautPage = () => {



    if (panier.hasClass('produitAjouté')) {

    }
}*/
