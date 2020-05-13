import {
  RequetebddId
} from "./requete.js";

let panier = localStorage.getItem("obj");
let panierJson = JSON.parse(panier);

console.log(panierJson[0].produit)



function getProduitID() {

  let defautPage = document.getElementById("page_defaut");
  let containerPanier = document.getElementById("panier");

  for (let i = 0; i < panierJson.length; i++) {
    const getProduitIDs = new RequetebddId;
    getProduitIDs.getInformationId(panierJson[i].produit)
      .then((responseText) => {
        containerPanier.style.display = "block";
        defautPage.style.display = "none";

        let panierProduit = document.createElement('div')
        containerPanier.appendChild(panierProduit)
        panierProduit.setAttribute('class', "panierProduit")

        let containerImage = document.createElement('div')
        panierProduit.appendChild(containerImage)
        containerImage.setAttribute('id', "containerImage")

        let panierImage = document.createElement("img")
        containerImage.appendChild(panierImage)
        panierImage.setAttribute("src", responseText.imageUrl)
      });

  }
}

window.onload = getProduitID();
/*let defautPage = document.getElementById("page_defaut");
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



console.log(panierJson);
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
    <div id="panierProduit">
                <div id="containerImage">
                    <img id="panierImage" alt="appareil_photo">
                </div>
                <div>
                    <p id="panierResume">produit est super</p>
                </div>

                <div>
                    <p id="panierPrix">50$</p>
                </div>

            </div>
}*/