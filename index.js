import {
  Requetebdd
}
from './requete.js';

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

// Création loader
let presentationProduit = document.getElementById('presentation_produit')
let newLoaders = document.createElement('div')
presentationProduit.appendChild(newLoaders)
newLoaders.setAttribute('class', 'lds-hourglass')

var getProduct = new Requetebdd
getProduct.getAllInformation()
  .then((responseText) => {
    presentationProduit.removeChild(newLoaders)
    let list = document.getElementById('list_produits')
    for (let i = 0; i < responseText.length; i++) {
      let presentationProduit = document.getElementById('presentation_produit')

      /* Création div */
      let newElt = document.createElement('div')
      presentationProduit.appendChild(newElt)
      newElt.setAttribute('class', 'produits_page__option')

      /* Création balise Title */
      let newTitle = document.createElement('h2')
      newElt.appendChild(newTitle)
      newTitle.setAttribute('class', 'title_produit')

      /* Création link Title */
      let newLink = document.createElement('a')
      newTitle.appendChild(newLink)

      newLink.setAttribute(
        'href',
        'produits.html?id=' + responseText[i]._id,
        'id',
        responseText[i].name
      )
      newLink.innerHTML = responseText[i].name


      /* Création balise image */
      let newImg = document.createElement('img')
      newElt.appendChild(newImg)
      newImg.setAttribute('class', 'image_produit')
      newImg.setAttribute('alt', 'appareil photo')
      newImg.setAttribute('src', responseText[i].imageUrl)

      /* Création balise p description du produit */
      let newDescription = document.createElement('p')
      newElt.appendChild(newDescription)
      newDescription.setAttribute('class', 'description')
      newDescription.innerHTML = responseText[i].description

      /* Création balise p affichage du prix */
      let newPrice = document.createElement('p')
      newElt.appendChild(newPrice)
      newPrice.setAttribute('class', 'prix')
      newPrice.innerHTML = responseText[i].price + ' Euros'
    }

  })
  // En cas d'erreur de récuperation
  .catch((reject) => {
    presentationProduit.removeChild(newLoaders)
    let newElt = document.createElement('div')
    presentationProduit.appendChild(newElt)
    newElt.setAttribute('id', 'produits_page__option')

    let newImg = document.createElement('img')
    newElt.appendChild(newImg)
    newImg.setAttribute('id', 'image_produit')
    newImg.setAttribute('alt', 'homme perdu dans un champs')
    newImg.setAttribute('src', 'images/errorserver.jpg')

    let newDescription = document.createElement('p')
    newElt.appendChild(newDescription)
    newDescription.setAttribute('id', 'description')
    newDescription.innerHTML = "une erreur c'est produite"

    let newPrice = document.createElement('a')
    newElt.appendChild(newPrice)
    newPrice.setAttribute('href', 'index.html')
    newPrice.innerHTML = 'clickez pour recharger'
  })