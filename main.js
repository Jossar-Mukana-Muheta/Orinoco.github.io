const responsiveNav = () => {
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
}


const shoppingIconNav = () => {
    let panier = localStorage.getItem("obj");
    let panierJson = JSON.parse(panier);
    let icon = document.getElementById('iconPanier')
    let tableauQuantite = []
    let quantite
    let resultatTotal
    for (let i = 0; i < panierJson.length; i++) {
        // récupération des quantité de chaque produit
        quantite = panierJson[i].quantite
        // insertion des quantité dans le tableau + modification string en nombre
        tableauQuantite.push(parseInt(quantite))
        resultatTotal = tableauQuantite.reduce(myFunc)

        function myFunc(tableauQuantite, num) {
            return tableauQuantite + num;
        }

        icon.innerHTML = resultatTotal
    }
}
// if (localStorage.length > 0) {


export {
    responsiveNav,
    shoppingIconNav
}