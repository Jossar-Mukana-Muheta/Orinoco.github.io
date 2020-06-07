describe('Comportement Utilisateurs', () => {

  describe("Quand l'utilisateur rentre un mauvais format d'email", () => {
    it("Le formulaire n'est pas soumis", () => {

      let email = "monmailgmail.com"
      

      const validMail = (email) => {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          return  false;
        }
        }

      
      expect(validMail(email)).toEqual(false)
    })


  })

  

});