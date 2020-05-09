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


            const titre = responseText.name
            const image = responseText.imageUrl
            const prix = responseText.price
            const description = responseText.description
            const optionList = responseText.lenses

            let titreProduit = document.getElementById('titre_produit')
            let imgProduitChoisit = document.getElementById('produit_choisit')
            let descriptionProduitChoisit = document.getElementById('description')
            let prixProduitChoisit = document.getElementById('prix')
            let lentille = document.getElementById('lentille-select')

            // récuperer option + affichage liste déroulante
            var optionTableau = optionList
            for (let i = 0; i < optionTableau.length; i++) {
                let option = document.createElement('option')
                lentille.appendChild(option)
                option.setAttribute('value', optionTableau[i])
                option.innerHTML = optionTableau[i]
            }

            imgProduitChoisit.setAttribute('src', image)
            prixProduitChoisit.innerHTML = prix + ' €'
            descriptionProduitChoisit.innerHTML = description
            titreProduit.innerHTML = titre


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