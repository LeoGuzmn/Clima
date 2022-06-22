const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefalut();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error
        MostrarError('Ambos campos son obligatorios');

        return;
    }

    //consultar la api
    consultarAPI(ciudad, pais);
}

function MostrarError(mensaje){
    console.log(mensaje);

    if(!alerta){
    //Crear una alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700',
    'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
        <strong class="font-bold"> Error! </strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    //Se elimine la alerta despues de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
 }

}

 function consultarAPI(ciudad, pais) {

    const appId = '7a47cb95d8935ff9c66b27d027126392';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},{state code},${pais}&appid=${appId}`;
    
    Spinner(); //muestra el spinner de carga
    
    fetch(url)
        .then ( respuesta => respuesta.json())
        .then ( datos => {
            limpiarHTML(); // Limpiar el HTML Previo

            if(datos.cod === "404") {
                MostrarError('Ciudad no encontrada');
                return;
            }

            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        });
}

function mostrarClima(datos){
    const {name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');
    
    const actual = document.createElement('p');
    actual.innerHTML = ` ${centigrados} %`;
    actual.classList.add('font-bold', 'text-6xl');

    const temp_maxima = document.createElement('p');
    temp_maxima.innerHTML = `Temp Max: ${max} %`;
    temp_maxima.classList.add('text-x1');

    const temp_minima = document.createElement('p');
    temp_minima.innerHTML = `Temp Min: ${min} %`;
    temp_minima.classList.add('text-x1');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temp_maxima);
    resultadoDiv.appendChild(temp_minima);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);



function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `;

    resultado.appendChild(divSpinner);

}