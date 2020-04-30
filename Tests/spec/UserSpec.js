describe('Comportement Utilisateurs', () => {

  describe("Quand l'utilisateur ne choisit pas d'option", () => {
    it('Le bouton validation doit être desactivé', () => {
      getOption()
      expect(disabled).toEqual('ko')
    })


  })

  describe("Quand l'utilisateur choisi un nombre de produit", () => {
    it('le nombre de produit est ajouté au panier', () => {

      var number = 8;
      getNbrProduct(number)
      expect(number).toEqual(panier)
    });

    it('doit indiquer un message zero produit ajouté ', () => {

       var number = 0
      getNbrProduct(number)
      expect(message).toEqual("error")

    });
    
    
  });

  describe("Quand l'utilisateur entre une mauvaise url", () => {
    it('affiche une page 404', () => {
      var urlUser = "bad url"
      errorUrl(urlUser)
      expect(goodUrl).toEqual("404")
    });
    
  });
  

  describe("Quand l'utilisateur ajoute un produit à X euros a son panier", () => {
    it('le montant total du panier doit augmenter de X euros ', () => {
      var priceProduct = 5;
      totalPrice(priceProduct)
      expect(total).toEqual(panier + priceProduct)
    });
    
  });
  


  

})
