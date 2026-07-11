// Declaro un array de objetos en los que capturo los inputs y botones que definen al repositorio.
let repositorio = [
    {
        nombre: 'cantidad',
        input: document.querySelector('#obras'),
        boton: document.querySelector('#definirCant')
    },
    {
        nombre: 'tiempo',
        input: document.querySelector('#tiempoTransf'),
        boton: document.querySelector('#definirTiem')
    },
    {
        nombre: 'costo',
        input: document.querySelector('#costo'),
        boton: document.querySelector('#definirCos')
    }
];

// Declaro variables en las que capturo los últimos tres botones.
let botonAgregar = document.querySelector('#agregar');
let botonMostrar = document.querySelector('#mostrar');
let botonReiniciar = document.querySelector('#reiniciar');

// Declaro un array que captura los inputs de cada obra.
let casillerosNodeList = document.querySelectorAll('.casilleros');
let casilleros = [];
casillerosNodeList.forEach(function(x) {
    casilleros.push(x);
});

// Declaro una variable que captura el párrafo en el que mostraré el resultado.
let especificaciones = document.querySelector('#especificaciones');

// Array de obras
let obras = [];

// Alertas
let alertasObra = [
    'Por favor, ingresá una duración válida',
    'Por favor, ingresá un peso de archivo válido',
]
let alertasBot = [
    'Por favor, ingresá una cantidad de obras válida',
    'Por favor, ingresá un tiempo de transferencia válido',
    'Por favor, ingresá un costo mensual válido'
]

// Variable para chequear si se definieron los datos del repositorio.
let definidos = 0;

// Función para reiniciar el formulario
function reiniciar() {
    repositorio.forEach(function(x) {
        x.input.disabled = false;
        x.input.value = '';
        x.boton.disabled = false;
    });
    botonAgregar.disabled = true;
    botonMostrar.disabled = true;
    obras = [];
    casilleros.forEach(function(x) {
        x.value = '';
        x.disabled = true;
    });
    definidos = 0;
    especificaciones.innerText = '';
    botonReiniciar.disabled = true;
}

// Función que habilita el botón Agregar una vez se llene la información de la obra.
function chequearFormLleno() {
    let lleno = true;
    casilleros.forEach(function(x) {
        if (x.value == '') {
            lleno = false;
        }
    });
    botonAgregar.disabled = !lleno;
}

// Función que valida y agrega la obra al array de obras.
function validarYAgregar() {
    let valido = true;
    let nombre = casilleros[0].value;
    obras.forEach(function(x) {
        if (x.nombre == nombre) {
            alert('Esa obra ya fue guardada');
            valido = false;
        }
    });
    let obra = {
    nombre: nombre,
    };
    let claves = ['duracion', 'peso'];
    casilleros.slice(1).forEach(function(x, i) {
        if (x.value == '' || Number(x.value) <= 0) {
            alert(alertasObra[i]);
            valido = false;
        }
        obra[claves[i]] = Number(x.value);
    })
    if (valido) {
        obras.push(obra);
        casilleros.forEach(function(x){
            x.value = '';
        });
        chequearFormLleno();
        if (obras.length == Number(repositorio[0].input.value)) {
            casilleros.forEach(function(x){
                x.disabled = true;
            });
            botonAgregar.disabled = true;
            botonMostrar.disabled = false;
        }
    }
}

// Función que suma las duraciones de las obras.
function sumaDuraciones() {
    let suma = 0;
    obras.forEach(function(x) {
        suma+= x.duracion;
    });
    return suma;
}

// Función que devuelve el nombre de la obra con mayor duración
function masLarga() {
    let nombre = '';
    let duracion = 0;
    obras.forEach(function(x) {
        if (x.duracion > duracion) {
            nombre = x.nombre;
            duracion = x.duracion;
        }
    });
    return nombre;
}

// Función que te devuelve el tiempo de transferencia según el peso de determinada obra.
function tiempoMasLarga(nombre) {
    let tiempo = 0;
    obras.forEach(function(x) {
        if (x.nombre == nombre) {
            tiempo = Number(repositorio[1].input.value) * x.peso;
        }
    });
    return tiempo;
}

// Función que calcula el presupuesto.
function presupuesto() {
    let presu = 0;
    obras.forEach(function(x) {
        presu+= x.peso * Number(repositorio[2].input.value);
    });
    return presu * 12;
}

// Detecto eventos para los que quiero reiniciar el formulario.

window.addEventListener('load', function() {
    reiniciar();
});

botonReiniciar.addEventListener('click', function(){
    reiniciar();
});

// Detecto si se llenaron los casilleros de la obra para habilitar el botón agregar.
casilleros.forEach(function(x) {
    x.addEventListener('input', chequearFormLleno);
});

// Detecto si se completó la info del repositorio para habilitar los otros casilleros.
repositorio.forEach(function(x, i) {
    x.boton.addEventListener('click', function() {
        if (x.input.value == '' || Number(x.input.value) <= 0) {
            alert(alertasBot[i]);
        } else {
            x.input.disabled = true;
            x.boton.disabled = true;
            definidos++;
        }
        if (definidos == 3) {
            definidos = 0;
            casilleros.forEach(function(x){
                x.disabled = false;
            });
    }
    });
});

// Chequeo si es válida la obra agregada y en ese caso la agrego.
botonAgregar.addEventListener('click', function() {
    validarYAgregar();
});

// Detecto si se aprieta el botón 'Mostrar...' y muestro las especificaciones resultantes.
botonMostrar.addEventListener('click', function() {
    especificaciones.innerText = `La duración total de todas las obras es de ` + sumaDuraciones() + ` minutos.
    La duración promedio de las obras es de ` + Math.round(sumaDuraciones()/obras.length) + ` minutos. 
    La obra de mayor duración es "` + masLarga() + `" y tiene un tiempo de transferencia necesario de ` + tiempoMasLarga(masLarga()) + ` milisegundos para descargarla.
    El presupuesto necesario para mantener funcionando el repositorio durante un año es de $` + presupuesto() + `.`;
    botonMostrar.disabled = true;
    botonReiniciar.disabled = false;
});