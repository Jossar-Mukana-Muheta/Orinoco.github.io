

class RequeteApi {

    getProduct = (id = "", data) =>
        new Promise((resolve, reject) => {
            const  url = "http://localhost:3000/api/cameras/"
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
                    resolve(JSON.parse(xhr.responseText));
                } else if (this.readyState == 4 && this.status != 200) {
                    reject();
                } else {}
            };
            if(data){
                xhr.open("POST", url + "order");
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(data);
                
            }else
            {xhr.open("GET", url + id);
            xhr.send();
        }
        });
}
export {
    RequeteApi,
};