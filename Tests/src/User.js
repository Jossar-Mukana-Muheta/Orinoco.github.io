// Aucun option choisit
var listValue = document.getElementById('liste')
var disabled = ' '

getOption = () => {
  var submitButton = document.getElementById('submitButton')
  if (listValue == null) {
    disabled = 'ko'
    return disabled
  }
}

// Choit quantité produit à mettre dans le panier
var panier
var message
getNbrProduct = (number) => {
  if (number === 0) {
    message = 'error'
    return message
  } else {
    panier = number
    return panier 
  }
  
  // Prix panier
  var total;
  var panier = 2;
  totalPrice =(priceProduct)=>{
    return total = panier + priceProduct;
  }
}



// Mauvaise Url
var goodUrl;
var existingUrl = 'existing url'
errorUrl = (urlUser) => {
  if (urlUser !== existingUrl) {
    goodUrl = '404';
    console.log(goodUrl);
    return goodUrl;
}
}

