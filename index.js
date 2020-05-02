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

// Requète pour récuréper l'objet
const getInformation = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:3000/api/cameras')
  xhr.onload = () => resolve(JSON.parse(xhr.responseText))
  xhr.onerror = () => reject()
  xhr.send()
})

// Création loader
let presentationProduit = document.getElementById('presentation_produit')
let newLoaders = document.createElement('div')
presentationProduit.appendChild(newLoaders)
newLoaders.setAttribute('class', 'lds-hourglass')

getInformation.then((responseText) => {
  // Fonction pour afficher élément récuperer sur la page d'accueil
  getProduit(responseText)
  
})
// En cas d'erreur de récuperation
getInformation.catch((reject) => {
  getProduitError()
})

// Fonction pour afficher élément récuperer sur la page d'accueil
const getProduit = (responseText) => {
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
      'produits.html?img=' + responseText[i].imageUrl + '&price=' + responseText[i].price + '&descr=' + responseText[i].description,
      'id',
      responseText[i].name
    )
    newLink.innerHTML = responseText[i].name

    /* Création balise image */
    let newImg = document.createElement('img')
    newElt.appendChild(newImg)
    newImg.setAttribute('class', 'image_produit')
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
  getChoiceProduct();
}

// Fonction pour afficher une erreur et invite à recharger la page
const getProduitError = () => {
  presentationProduit.removeChild(newLoaders)
  let newElt = document.createElement('div')
  presentationProduit.appendChild(newElt)
  newElt.setAttribute('id', 'produits_page__option')

  let newImg = document.createElement('img')
  newElt.appendChild(newImg)
  newImg.setAttribute('id', 'image_produit')
  newImg.setAttribute('src', 'images/errorserver.jpg')

  let newDescription = document.createElement('p')
  newElt.appendChild(newDescription)
  newDescription.setAttribute('id', 'description')
  newDescription.innerHTML = "une erreur c'est produite"

  let newPrice = document.createElement('a')
  newElt.appendChild(newPrice)
  newPrice.setAttribute('href', 'index.html')
  newPrice.innerHTML = 'clickez pour recharger'
}

getChoiceProduct =() =>{

  //Réquete url page produit

const queryString = window.location.search

const urlParams = new URLSearchParams(queryString)
const image = urlParams.get('img')
const prix = urlParams.get('price')
const descr = urlParams.get('descr')

let imgProduitChoisit = document.getElementById('produit_choisit')
let descrR = document.getElementById('description')
let prixProduitChoisit = document.getElementById('prix')

imgProduitChoisit.setAttribute('src', image)
prixProduitChoisit.innerHTML = prix
descrR.innerHTML = descr

}


