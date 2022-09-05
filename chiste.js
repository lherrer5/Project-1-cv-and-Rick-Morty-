window.addEventListener('DOMContentLoaded', chistesAleatorios)//window es el padre y DOMContect sirve para ejecutar instrucciones cuando el navegador está listo para realizar acciones sobre el DOM

const obtenerChistes = document.getElementById("unomas");//para indicar la etiqueta donde se hace el evento

obtenerChistes.addEventListener('click', chistesAleatorios)//al hacer click ejecuta la funcion


function chistesAleatorios() {
    const endPoint = 'https://api.dadjokes.io/api/random/joke';

    fetch(endPoint)
        .then(response => response.json())//trae info d la Api en formato json
        .then(data => {//en el parametro data guardaré los datos recibidos.
            document.getElementById("chiste").textContent = data.body[0].setup//con text content inserto el texto segun documentacion de api
            document.getElementById("respuesta").textContent = data.body[0].punchline
        }).catch(error =>console.log(error))//trae error de la Api
}