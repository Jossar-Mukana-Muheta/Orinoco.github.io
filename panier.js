const ImagePanier = localStorage.getItem('panier image')
const TitrePanier = localStorage.getItem('panier titre')
const PrixPanier = localStorage.getItem('panier prix')


panier = document.getElementById('panier')
total = document.getElementById('total')


prix = document.createElement('p')
total.appendChild(prix)
prix.setAttribute('class', 'prix')
prix.innerHTML = PrixPanier
panier.setAttribute('class', 'produitAjouté')

image = document.createElement('img')
panier.appendChild(image)
image.setAttribute('src', ImagePanier)

prixTotal = document.getElementById('prixTotal')
prixTotal.innerHTML = PrixPanier


// supprimer panier 
suppPanier = () => {
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
}