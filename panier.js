import {
    RequetebddId
} from "./requete.js"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

function getProduitID() {

    const getProduitIDs = new RequetebddId
    getProduitIDs.getInformationId(id)
        .then((responseText) => {
            panier = document.getElementById('panier')
            total = document.getElementById('total')

            prix = document.createElement('p')
            total.appendChild(prix)
            prix.setAttribute('class', 'prix')
            prix.innerHTML = responseText.price
            panier.setAttribute('class', 'produitAjouté')

            image = document.createElement('img')
            panier.appendChild(image)
            image.setAttribute('src', responseText.imageUrl)

            prixTotal = document.getElementById('prixTotal')
            prixTotal.innerHTML = responseText.price

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