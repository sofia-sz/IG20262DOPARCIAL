//Declaro la variable que contiene la página de la galería mostrada en el momento y capturo los elementos necesarios para armar la galería
let pagActual = 0;
let imagen1 = document.querySelector('#im1');
let imagen2 = document.querySelector('#im2');
let pie = document.querySelector('#pie');
let botonAnt = document.querySelector('#anterior');
let botonSig = document.querySelector('#siguiente');

//Me guardo todas las obras en un array de objetos
let obras = [
    {
        src1: "./img/anderson-1.jpg", 
        alt1: "Chalkroom, 2017",
        src2: "./img/anderson-2.jpg",
        alt2: "Chalkroom, 2017"
    },
    {   
        src1: "./img/anderson-3.jpg", 
        alt1: "Songs and Stories from Moby Dick, 1999",
        src2: "./img/anderson-4.jpg",
        alt2: "Songs and Stories from Moby Dick, 1999"
    },
    {
        src1: "./img/anderson-5.jpg", 
        alt1: "Habeas Corpus, 2015",
        src2: "./img/anderson-6.jpg",
        alt2: "Habeas Corpus, 2015"
    },
    {
        src1: "./img/anderson-7.jpg", 
        alt1: "Heart of a Dog, 2015",
        src2: "./img/anderson-8.jpg",
        alt2: "Heart of a Dog, 2015"
    },
    {
        src1: "./img/anderson-9.jpg", 
        alt1: "Lolabelle in the Bardo Series, 2011",
        src2: "./img/anderson-10.jpg",
        alt2: "Lolabelle in the Bardo Series, 2011"
    }
]

//Me aseguro que al actualizar se resetee pagActual y se desactive el botón 'anterior'
window.addEventListener('load', function(){
    pagActual = 0;
    botonAnt.disabled = true;
});

//Función que me actualiza las imágenes y el pie que se muestran en la página actual
function actualizarGal(){
    imagen1.src = obras[pagActual].src1;
    imagen1.alt = obras[pagActual].alt1;
    imagen2.src = obras[pagActual].src2;
    imagen2.alt = obras[pagActual].alt2;
    pie.innerText = obras[pagActual].alt1;
}

//Función para pasar a la siguiente página cuando se toca el botón "siguiente"
botonSig.addEventListener('click', function() {
    pagActual++;
    if (botonAnt.disabled) {
        botonAnt.disabled = false;
    }
    if (pagActual == 4) {
        botonSig.disabled = true;
    }
    actualizarGal();
});

//Función para pasar a la página anterior cuando se toca el botón "anterior"
botonAnt.addEventListener('click', function() {
    pagActual--;
    if (botonSig.disabled) {
        botonSig.disabled = false;
    }
    if (pagActual == 0) {
        botonAnt.disabled = true;
    }
    actualizarGal();
});