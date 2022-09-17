var pagActual = ""; //variable global para saber la busqueda que actualmente se esta realizando
let contPage = 1; //variable global para inicializar la funcion de incremento de paginas

//obtencion de los elementos nav del html
const female = document.getElementById('buttonFemales');
const male = document.getElementById('buttonMales');
const allc = document.getElementById('buttonAll');
const alive = document.getElementById('buttonAlive');
const dead = document.getElementById('buttonDead');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

//evento que escucha cuando se oprime el boton next y envia el jquery a la funcion info() para traer tarjetas
next.addEventListener('click', () => {
    //variable contadora de aumento páginas
    contPage=contPage+1;
    if (pagActual == "female") {
        //paso a info los parametros q necesito connsultar
        info('Female', '', contPage)//parametros de gender y change page
    } else if (pagActual == "male") {
        info('Male', '', contPage)//parametros de gender y change page
    } else if (pagActual == "dead") {
        info('', 'Dead', contPage)//parametros de status y change page
    } else if (pagActual == "alive") {
        info('', 'Alive', contPage)//parametros de status y change page
    } else if (pagActual == "allc") {
        info('', '', contPage)//solo paso changePage para q muestre todos los personajes
    }
})

//evento que escucha cuando se oprime el boton previous 
previous.addEventListener('click', () => {
    contPage=contPage-1;
    if (pagActual == "female") {
        info('Female', '', contPage)
    } else if (pagActual == "male") {
        info('Male', '', contPage)
    } else if (pagActual == "dead") {
        info('', 'Dead', contPage)
    } else if (pagActual == "alive") {
        info('', 'Alive', contPage)
    } else if (pagActual == "allc") {
        info('', '', contPage)
    }
})

//Evento que escucha cuando se oprime el boton de busqueda all, female, male, alive, died.
//Se le asigna el valor a la variable global pagActual dependiendo el boton de busqueda seleccionado 
female.addEventListener('click', function () {
    pagActual = "female"
    contPage = 1;
    info('Female', '', '');
});


male.addEventListener('click', function () {
    pagActual = "male"
    contPage = 1;
    info('Male', '', '');
});

alive.addEventListener('click', function () {
    pagActual = "alive"
    contPage = 1;
    info('', 'Alive', '');
});

dead.addEventListener('click', function () {
    pagActual = "dead"
    contPage = 1;
    info('', 'Dead', '');
});

allc.addEventListener('click', function () {
    pagActual = "allc"
    contPage = 1;
    info('', '', '');
});

//funcion para consumir la API e insertar los datos al HTML
function info(gender, status, changePage) {
    //concateno los parametros q necesito con marcadores de posicion ${} y uso plantillas literales encerradas por el carácter ``
    const api = `https://rickandmortyapi.com/api/character/?gender=${gender}&status=${status}&page=${changePage}`;

    //Resetear botones cuando se busca para que al llegar a la ultima pag y tengo next desabilitado, al darle previous se m vuelva a activar
    next.classList.remove("contenedorbotones");
    previous.classList.remove("contenedorbotones");

    fetch(api)
        .then(response => response.json())//recibo mi respuesta en formato .json
        .then(data => {
            //validación primera y última página
            if (data.info.pages == changePage) {
                //Ultima pagina
                alert("ultima página");
                //agrego la clase para desactivar boton next
                next.classList.add("contenedorbotones")
            }

            if (changePage === 1) {
                previous.classList.add("contenedorbotones")
                alert("primera página");
            }

            data.results.forEach(personaje => {//empiezo a manipular los dato recibidos, con la key results
            //inserto etiqueta article en mi html
                const article = document.createRange().createContextualFragment(`
                <article class="card">
                <div class="image-container">
                    <h2 class="card-body-p">${personaje.name}</h2>
                    <img src="${personaje.image}" alt="personaje" class="card-body-img">
                    <p class="generos">${personaje.gender}</p>
                    <span class="card-body-status">${personaje.status}</span>
                    <span class="card-body-species">${personaje.species}</span>
                </div>
            </article>
                    `);
            //esta const information selecciona mi elemento htlm con la clase mainPadre para hacer el append d la const article
                const information = document.querySelector('.mainPadre')
                information.append(article);
            });
        }).catch(error =>console.log(error))
        
    //llamo a funcion borrar para eliminar contenido anterior e insertar lo nuevo    
    removeCards(); //borra las cartas anteriores
    
    //crea la clase activeButtons reemplazando la contenedorbotones para q aparezca next y previous
    let buttons = document.querySelector('.contenedorbotones')
    buttons.classList.add('activeButtons')
}


function removeCards() {
    const cards = document.querySelector('.mainPadre').innerHTML = "";
}

