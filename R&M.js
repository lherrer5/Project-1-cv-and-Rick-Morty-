let acu = 0;//pa reinicar la pag


window.addEventListener('DOMContentLoaded', getCharacters);//esperar q se cargue el html y corra la funcion

function getCharacters() {//inserta el texto de bienvenida
//variable crearTexto crea las etiquetas y contenido q tengo entre comillas francesas
    const crearTexto = document.createRange().createContextualFragment(`
                    
                        <div class="main-hijo">
                            Choose any of the catergories above
                            and learn more about Rick and Morty characters.
                        </div>
                
                `);
// variable information escoge con la clase main-hijo el elemnto en donde se inseratara la variable crearTexto
    const information = document.querySelector('.main-hijo')
    // metodo append hace la inserción de information en crearTexto
    information.append(crearTexto);
}

//creamos variables para llamar las etiquetas li q tiene boton con su ID
const female = document.getElementById('buttonFemales');
const male = document.getElementById('buttonMales');
const allc = document.getElementById('buttonAll');
const alive = document.getElementById('buttonAlive');
const dead = document.getElementById('buttonDead');

//creo el evento click para cada variable y la funcion info para q llame los personajes segun el filtro de la parte final d la url
female.addEventListener('click', function () {
    
    info('https://rickandmortyapi.com/api/character/?gender=Female');//hace llamado a funcion info para inserta los personajes
    borrar()//hace llamado a funcion borrar para eliminar el contenido actual
});

male.addEventListener('click', function () {
    info('https://rickandmortyapi.com/api/character/?gender=Male');
    borrar()
});

alive.addEventListener('click', function () {
    info('https://rickandmortyapi.com/api/character/?status=Alive');
    borrar()
});

dead.addEventListener('click', function () {
    info('https://rickandmortyapi.com/api/character/?status=Dead');
    borrar()
});

allc.addEventListener('click', function () {
    info('https://rickandmortyapi.com/api/character');
    borrar()
});


//info llama a la api
function info(url) {
    fetch(url)
        .then(response => response.json())//trae la info de la api en formato json
        .then(data => {
            data.results.forEach(cartoon => {//me trae los resultados d la api (como objeto js-) segun la cantidad de elementos d la api
                //variable div crea las etiquetas y contenido q tengo entre comillas francesas
                //cartoon es un parametro del array data.result con los atributos name, image, etc que me trajo la api
                const div = document.createRange().createContextualFragment(`
                <article class="card">
                <div class="image-container">
                    <h2 class="card-body-p">${cartoon.name}</h2>
                    <img src="${cartoon.image}" alt="personaje" class="card-body-img">
                    <p class="generos">${cartoon.gender}</p>
                    <span class="card-body-status">${cartoon.status}</span>
                    <span class="card-body-species">${cartoon.species}</span>
                </div>
            </article>
                    `);
//esta const information selecciona mi elemento htlm con la clase mainPadre para hacer el append d la const div
                const information = document.querySelector('.mainPadre')
                acu = acu + 1;//da la vuelta en el forEach hasta llegar al ultimo elemento
                information.append(div);
            });

        }).catch(error =>console.log(error))
//llamo a funcion borrar para eliminar contenido anterior e insertar lo nuevo
    borrar()
}


function borrar(){
    const parent = document.querySelector('.mainPadre')// variable parent escoge con la clase main-padre el elemnto al q voy a borrar contenido insertando "" vacio
    parent.innerHTML = ""
}

 // forma con for
    // const cards = document.querySelectorAll('.card')
    // for(card of cards) {
    //     card.remove() /el metodo remove m borra card
    //}