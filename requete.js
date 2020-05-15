class Requetebdd {
    // Récuperer tous les éléménts
    getAllInformation = () =>
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if (this.readyState == 4 && this.status != 200) {
                    reject();

                } else {}
            };
            xhr.open("GET", "http://localhost:3000/api/cameras/");
            //xhr.onload = () => resolve(JSON.parse(xhr.responseText))
            //xhr.onerror = () => reject()
            xhr.send();
        });

    // Envoie
}

class RequetebddId {
    // Récuperer éléménts avec ID
    getInformationId = (id) =>
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if (this.readyState == 4 && this.status != 200) {
                    reject();

                } else {}
            };
            xhr.open("GET", "http://localhost:3000/api/cameras/" + id);
            xhr.send();
        });
}

class PostRequette {
    // Envoie éléments vers BDD
    postInformation = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/api/cameras/order");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(jsonBody));
    };
}

export {
    Requetebdd,
    RequetebddId,
    PostRequette
};