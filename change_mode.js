//definir el boton que será el mando
const botonMando= document.getElementById("botonMando")

//indico al boton lo que quiero que haga con el click
botonMando.addEventListener("click",cambioColor)

//Función para cambiar el color
function cambioColor(){
    const link1 =document.getElementById("cambio_modo");
    if (link1.href.match("./dark.css")) {
        link1.href = "./light.css"; 
    }
    else {
        link1.href = "./dark.css";  
    }
}

