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
  /* Récuperer la liste des nom de produits au chargement de la page  */
  getProduit = () => {
    let list = document.getElementById('list_produits')
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText)
        for (let i = 0; i < response.length; i++) {
          let newElt = document.createElement('li')
          let newLink = document.createElement('a')
          list.appendChild(newLink).setAttribute('id', [i])
          newLink.appendChild(newElt).innerHTML = (response[i].name)

          newLink.addEventListener('click', function(e){
            let produitChoisitImg = document.getElementById('produit_choisit')
            let description = document.getElementById('description')
            let prix = document.getElementById('prix')
            
            description.innerHTML = response[i].description;
            produitChoisitImg.setAttribute("src", response[i].imageUrl)
            prix.innerHTML = response[i].price + " Euros"
  
          });
  
        }
        

        
        
      } else {
        console.error()
      }
    }
    request.open('GET', 'http://localhost:3000/api/cameras')
    request.send()
  }
  getProduit()
});


