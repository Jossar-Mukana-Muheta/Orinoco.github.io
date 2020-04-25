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
  /* Récuperer la liste des nom de produits */
  getProduit = () => {
    let list = document.getElementById('list_produits')
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText)
        for (let i = 0; i < response.length; i++) {
          let newElt = document.createElement('li')
          let newLink = document.createElement('a')
          list.appendChild(newLink).setAttribute('href', 'produits.html')
          newLink.appendChild(newElt).innerHTML = (response[i].name)
        }
      }
      console.log('Lancer le serveur node')
    }
    request.open('GET', 'http://localhost:3000/api/cameras')
    request.send()
  }
  getProduit()




  /* Récuperer image des produit produits */
  getProduitImage = () => {

    let image = document.getElementById('produits_page__option')
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText)
        for (let i = 0; i < response.length; i++) {
          let newSource = document.createElement('img')
          image.appendChild(newSource).setAttribute('src', response[i].imageUrl)
          console.log(response[i].imageUrl)
        }
      }
      console.log('Lancer le serveur node')
    }
    request.open('GET', 'http://localhost:3000/api/cameras')
    request.send()
  }

  getProduitImage()
})
