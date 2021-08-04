const blackjackGame = (() => {
    'use strict'
    //Variables
    let btnNuevo = document.querySelector('#btnNuevo');
    let btnPedir = document.querySelector('#btnPedir');
    let btnDetener = document.querySelector('#btnDetener');

    let divContenedorCartas = document.querySelectorAll('.contenedor-cartas');
    let smallPuntajeCartas = document.querySelectorAll('.puntaje-cartas');

    let puntajesJugadores = [];

    let baraja = [];
    const tipoCarta = ['C', 'D', 'H', 'S'];
    const cartasEspeciales = ['A', 'J', 'Q', 'K'];

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
    }

    const tomarCarta = () => {
        if(baraja.length === 0){
            throw 'No hay cartas en la baraja.';
        }

        const carta = baraja.shift();
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

    const acumularPuntos = (turno, carta) => {
        puntajesJugadores[turno] += valorCarta(carta);
        smallPuntajeCartas[turno].innerText = puntajesJugadores[turno];
        return puntajesJugadores[turno];
    }

    const mostrarNuevaCarta = (turno, carta) => {
        const nuevaCarta = document.createElement('img');
        nuevaCarta.classList.add('carta');
        nuevaCarta.src = `./assets/img/cartas/${ carta }.png`;
        divContenedorCartas[turno].append(nuevaCarta);
    }

    const determinarGanador = () => {
        const [puntajeMinimo, puntosComputadora] = puntajesJugadores;

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

    const turnoComputadora = (puntajeMinimo) => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        let puntosComputadora = 0;
        do{
            const carta = tomarCarta();

            puntosComputadora = acumularPuntos(puntajesJugadores.length - 1, carta);
            mostrarNuevaCarta(puntajesJugadores.length - 1, carta);
            
        }while(puntosComputadora < puntajeMinimo && puntajeMinimo <= 21);

        determinarGanador();
    }

    const iniciarJuego = (numJugadores = 2) => {
        puntajesJugadores = [];

        divContenedorCartas.forEach(element => element.innerHTML = '');
        smallPuntajeCartas.forEach(element => element.innerText = '0');

        for(let i = 0; i < numJugadores; i++){
            puntajesJugadores.push(i);
        }

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        crearBaraja();
    }

    //Eventos
    btnNuevo.addEventListener('click', () => {
        iniciarJuego();
    });

    btnPedir.addEventListener('click', () => {
        const carta = tomarCarta();

        const puntosJugador = acumularPuntos(0, carta);
        mostrarNuevaCarta(0, carta);
        
        if(puntosJugador > 21) {
            console.warn("Lo siento mucho, perdiste la partida.");            
            turnoComputadora(puntosJugador);
        }else if(puntosJugador === 21){
            console.warn("Felicidades, llegaste a los 21 puntos.");
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;  
        turnoComputadora(puntajesJugadores[0]);
    });

    return {
        jugar: iniciarJuego
    }
})();