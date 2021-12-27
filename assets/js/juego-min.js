(() => {
    'use strict'


    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Ref HTML

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');



    const puntosHTML = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');


    const inicializarjuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type)
            }
        }

        for (let type of types) {
            for (let special of specials) {
                deck.push(special + type)
            }
        }

        return _.shuffle(deck);

    }


    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay mas cartas en las barajas';
        }
        return deck.pop();
    }
    // pedirCarta();

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }


    //turo del computador 
    //Turno: 0 primero, 1 segundo
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores;

    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }



    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100);

    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosCompu = 0;
        do {
            const carta = pedirCarta();
            puntosCompu = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosCompu < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    //eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('LOL, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);


        } else if (puntosJugador === 21) {
            alert('Ganaste!');
            console.warn('Ganaste!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })


    btnNuevo.addEventListener('click', () => {
        inicializarjuego();

    });

})();
