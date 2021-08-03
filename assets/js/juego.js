//Variables
let btnNuevo = document.querySelector('#btnNuevo');
let btnPedir = document.querySelector('#btnPedir');
let btnDetener = document.querySelector('#btnDetener');

let divContenedorCartas = document.querySelectorAll('.contenedor-cartas');
let smallPuntajeCartas = document.querySelectorAll('.puntaje-cartas');

let baraja = [];
const tipoCarta = ['C', 'D', 'H', 'S'];
const cartasEspeciales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Funciones
const crearBaraja = () => {
    baraja = [];
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipoCarta){
            baraja.push(i + tipo);
        }
    }

    for(let esp of cartasEspeciales){
        for(let tipo of tipoCarta){
            baraja.push(esp + tipo);
        }
    }

    baraja = _.shuffle(baraja);
    console.log(baraja);
}

const tomarCarta = () => {
    if(baraja.length === 0){
        throw 'No hay cartas en la baraja.';
    }

    const carta = baraja.shift();
    console.log(baraja);
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;
    if(isNaN(valor)){
        puntos = (valor === 'A') ? 1 : (valor === 'J') ? 11 : (valor === 'Q') ? 12 : (valor === 'K') ? 13 : 0;
    }else{
        puntos = valor * 1;
    }

    return puntos;
}

const turnoComputadora = (puntajeMinimo) => {
    do{
        const carta = tomarCarta();

        const nuevaCarta = document.createElement('img');
        nuevaCarta.classList.add('carta');
        nuevaCarta.src = `./assets/img/cartas/${ carta }.png`;
        divContenedorCartas[1].append(nuevaCarta);

        puntosComputadora += valorCarta(carta);
        smallPuntajeCartas[1].innerText = puntosComputadora;

        if(puntajeMinimo > 21){
            break;
        }
    }while(puntosComputadora < puntajeMinimo && puntajeMinimo <= 21);

    setTimeout(() => {
        if(puntosComputadora === puntajeMinimo){
            alert('Nadie gana :(');
        }else if(puntajeMinimo > 21){
            alert('La computadora gana.');
        }else if(puntosComputadora > 21){
            alert('Ud ha ganado...!!!');
        }else{
            alert('La computadora gana.');
        }
    }, 100);
}

//Eventos
btnNuevo.addEventListener('click', () => {
    crearBaraja();

    puntosJugador = 0;
    puntosComputadora = 0;

    divContenedorCartas[0].innerHTML = '';
    divContenedorCartas[1].innerHTML = '';

    smallPuntajeCartas[0].innerText = '0';
    smallPuntajeCartas[1].innerText = '0';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

btnPedir.addEventListener('click', () => {
    const carta = tomarCarta();

    const nuevaCarta = document.createElement('img');
    nuevaCarta.classList.add('carta');
    nuevaCarta.src = `./assets/img/cartas/${ carta }.png`;
    divContenedorCartas[0].append(nuevaCarta);

    puntosJugador += valorCarta(carta);
    smallPuntajeCartas[0].innerText = puntosJugador;

    if(puntosJugador > 21) {
        console.warn("Lo siento mucho, perdiste la partida.");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn("Felicidades, llegaste a los 21 puntos.");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;  
    turnoComputadora(puntosJugador);
});

crearBaraja();