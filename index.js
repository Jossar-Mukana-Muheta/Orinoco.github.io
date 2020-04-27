
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

window.addEventListener('load', (event) => {

  let presentationProduit = document.getElementById('presentation_produit')

  let newLoaders = document.createElement('div')
  presentationProduit.appendChild(newLoaders)
  newLoaders.setAttribute('class', 'lds-hourglass')

  /* */
  const getInformation = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'http://localhost:3000/api/cameras')
      xhr.onload = () => resolve(JSON.parse(xhr.responseText))
      xhr.onerror = () => reject()
      xhr.send()
    })

  }

  getInformation().then((responseText) => {
    presentationProduit.removeChild(newLoaders)
    getProduit = (responseText) => {
      let list = document.getElementById('list_produits')
      for (let i = 0; i < responseText.length; i++) {
        let presentationProduit = document.getElementById('presentation_produit')

        /* Création div */
        let newElt = document.createElement('div')
        presentationProduit.appendChild(newElt)
        newElt.setAttribute('id', 'produits_page__option')

        /* Création balise image */
        let newImg = document.createElement('img')
        newElt.appendChild(newImg)
        newImg.setAttribute('id', 'image_produit')
        newImg.setAttribute('src', responseText[i].imageUrl)

        /* Création balise p description du produit */
        let newDescription = document.createElement('p')
        newElt.appendChild(newDescription)
        newDescription.setAttribute('id', 'description')
        newDescription.innerHTML = responseText[i].description

        /* Création balise p affichage du prix */
        let newPrice = document.createElement('p')
        newElt.appendChild(newPrice)
        newPrice.setAttribute('id', 'prix')
        newPrice.innerHTML = responseText[i].price + ' Euros'
      }
    }

    getProduit(responseText)
  })

  getInformation().catch(() => {
    
    presentationProduit.removeChild(newLoaders)
    let newElt = document.createElement('div')
    presentationProduit.appendChild(newElt)
    newElt.setAttribute('id', 'produits_page__option')

    /* Création balise image */
    let newImg = document.createElement('img')
    newElt.appendChild(newImg)
    newImg.setAttribute('id', 'image_produit')
    newImg.setAttribute('src', 'images/errorserver.jpg')

    /* Création balise p description du produit */
    let newDescription = document.createElement('p')
    newElt.appendChild(newDescription)
    newDescription.setAttribute('id', 'description')
    newDescription.innerHTML = "une erreur c'est produite"

    /* Création balise p affichage du prix */
    let newPrice = document.createElement('a')
    newElt.appendChild(newPrice)
    newPrice.setAttribute('href', 'index.html')
    newPrice.innerHTML = 'clickez pour recharger'
  })
})
