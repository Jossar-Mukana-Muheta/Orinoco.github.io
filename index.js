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

let list = document.getElementById('list_produits')


get_produit = () => {
  let request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let response = JSON.parse(this.responseText)
      for (let i = 0; i < response.length; i++) {
        let newElt = document.createElement('li')
        list.appendChild(newElt).innerHTML = (response[i].name)
        console.log(i)
      }
    }
    console.log('Lancer le serveur node');
  }
  request.open('GET', 'http://localhost:3000/api/cameras')
  request.send()
}

window.onload = get_produit
