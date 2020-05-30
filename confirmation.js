import { responsiveNav } from "./main.js";

let numerosCommande = localStorage.getItem('id')
let prixCommande = localStorage.getItem('prixPanier')

let prix= document.getElementById('prix')
let id = document.getElementById('id')

prix.innerHTML = prixCommande + " euros"
id.innerHTML =  numerosCommande

localStorage.removeItem('obj')

window.onload = responsiveNav()