  class Requetebdd {

      // Récuperer tous les éléménts     
      getAllInformation = () => new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('GET', 'http://localhost:3000/api/cameras/')
          xhr.onload = () => resolve(JSON.parse(xhr.responseText))
          xhr.onerror = () => reject()
          xhr.send()
      });



      // Envoie 

  }


  class RequetebddId {

      // Récuperer éléménts avec ID
      getInformationId = (id) => new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('GET', 'http://localhost:3000/api/cameras/' + id)
          xhr.onload = () => resolve(JSON.parse(xhr.responseText))
          xhr.onerror = () => reject()
          xhr.send()
      });

  }

  export {
      Requetebdd,
      RequetebddId
  }