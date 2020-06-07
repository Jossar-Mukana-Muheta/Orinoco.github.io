describe('Comportement Utilisateurs', () => {

  describe("Quand l'utilisateur ne choisit pas d'option", () => {
    it('Le bouton validation doit être desactivé', () => {
      getOption()
      expect(disabled).toEqual('ko')
    })


  })

});