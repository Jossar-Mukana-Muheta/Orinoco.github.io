import {
    RequetebddId
} from "./requete.js"

let panier = localStorage.getItem('obj')
let panierJson = JSON.parse(panier)


let panierPage = document.getElementById('panier')
let total = document.getElementById('total')

function getProduitID() {

    const getProduitIDs = new RequetebddId
    getProduitIDs.getInformationId(panierJson.produit)
        .then((responseText) => {


            const prix = document.createElement('p')
            total.appendChild(prix)
            prix.setAttribute('class', 'prix')
            prix.innerHTML = responseText.price
            panierPage.setAttribute('class', 'produitAjouté')

            const image = document.createElement('img')
            panierPage.appendChild(image)
            image.setAttribute('src', responseText.imageUrl)

            const prixTotal = document.getElementById('prixTotal')
            prixTotal.innerHTML = responseText.price * panierJson.quantite

        })

}


window.onload = getProduitID()










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