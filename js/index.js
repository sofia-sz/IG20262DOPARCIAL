// Capturo el elemento con la clase 'dato' y el elemento con el id 'nuevo' y los almaceno en variables. 
// También declaro un array con todos los datos posibles.
let dato = document.querySelector('.dato');
let boton = document.querySelector('#nuevo');
let datos = [
    'Laurie Anderson fue una de las primeras artistas en combinar performance, música experimental y tecnología en la escena del arte contemporáneo.',
    'Su tema O Superman se convirtió en un éxito inesperado en 1981 y llegó al segundo puesto en los rankings del Reino Unido.',
    'Diseñó su propio violín eléctrico que le permitía tocar sonidos digitales y activar efectos con sensores.',
    'Ha colaborado con artistas como Lou Reed, con quien estuvo casada hasta su fallecimiento en 2013.',
    'En 2002 fue nombrada la primera artista residente de la NASA, desarrollando obras inspiradas en la exploración espacial.',
    'Su instalación de realidad virtual Chalkroom recibió el premio a mejor experiencia inmersiva en el Festival de Cine de Venecia en 2017.',
    'Utiliza su propia voz alterada digitalmente como herramienta narrativa y estética en muchas de sus obras.',
    'Ha creado instalaciones multimedia que combinan texto, imagen y sonido en entornos sensoriales de gran escala.',
    'Su obra cruza permanentemente los límites entre arte, ciencia, política y poesía.',
    'Sigue siendo una figura activa e influyente en el arte digital y ha experimentado con inteligencia artificial en proyectos recientes.'
];

// Declaro la variable ind y la función 'indice' para que me devuelva un índice del 0 al 9.
let ind;
function indice() {
    ind = Math.floor(Math.random()*10);
    return ind;
}

// Detecto si se actualiza la página para cargar un dato random.
window.addEventListener('load', function() {
    dato.innerText = datos[indice()];
});

// Detecto si se presiona el botón para cargar un dato random. Con el do while me aseguro de que sea distinto al actual.
boton.addEventListener('click', function() {
    let indActual = ind;
    do {
        indice();
    } while (ind == indActual);
    dato.innerText = datos[ind];
});