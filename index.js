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

// Requète vers Api récupération 
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
  getProduit(responseText)
  getChoiceProduct()
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
      'produits.html?name=' + responseText[i].name + '&img=' + responseText[i].imageUrl + '&price=' + responseText[i].price + '&descr=' + responseText[i].description + '&option=' + responseText[i].lenses,
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
}


const getProduitError = () => {

  // Fonction pour afficher une erreur et invite à recharger la page

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

getChoiceProduct = () => {

  //Réquete url page produit
  const queryString = window.location.search

  const urlParams = new URLSearchParams(queryString)
  const titre = urlParams.get('name')
  const image = urlParams.get('img')
  const prix = urlParams.get('price')
  const description = urlParams.get('descr')
  const optionList = urlParams.get('option')



  let titreProduit = document.getElementById('titre_produit')
  let imgProduitChoisit = document.getElementById('produit_choisit')
  let descriptionProduitChoisit = document.getElementById('description')
  let prixProduitChoisit = document.getElementById('prix')
  let lentille = document.getElementById('lentille-select')

  // récuperer option + affichage liste déroulante
  var optionTableau = optionList.split(',')
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



  // Valider panier 


  //Vérifier Option + quantités
  const lentilleBorder = document.getElementById('lentille-select')
  lentilleBorder.style.border = '2px solid red'

  quantite = document.getElementById('quantite')
  var quantiteReel;

  const btnValidation = document.getElementById('btnPanier')

  lentille.addEventListener('change', function (e) {

    if (e.target.value != '') {
      quantite.addEventListener('change', function (e) {
        quantiteReel = e.target.value
        validOption()
      })

    } else {
      lentilleBorder.style.border = '2px solid red'
      btnValidation.setAttribute('disabled', '')
    }

  })

  validOption = () => {

    if (lentille.value != '' &&
      quantiteReel) {
      lentilleBorder.style.border = '2px solid green'
      btnValidation.removeAttribute('disabled')
    } else {
      lentilleBorder.style.border = '2px solid red'
    }

  }

  // Ajouter produit au localstoral

  onclick = () => {

    btnValidation.setAttribute('href', 'panier.html')
    do {
      localStorage.setItem('panier image', image)
      localStorage.setItem('panier titre', titre)
      localStorage.setItem('panier prix', prix)
      localStorage.setItem('quantite', quantiteReel)
      localStorage.setItem('option', lentille.value)
      i = i + 1;
    } while (i > 0);

  }













}