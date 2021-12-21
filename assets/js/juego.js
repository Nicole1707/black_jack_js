let deck = [];
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosCompu = 0;

//Ref HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo')
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadoras = document.querySelector('#computador-cartas')
const crearDeck = () => {
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
    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck();

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas en las barajas';

    }
    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta);

    return carta;
}
// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}


//turo del computador 


const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosCompu = puntosCompu + valorCarta(carta);
        puntosHTML[1].innerText = puntosCompu;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadoras.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosCompu < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosCompu === puntosMinimos) {
            alert('Nadie Gana');
        } else if (puntosMinimos ===21) {
            alert('Jugador Gana. Ey Ganaste');
        }
        else if ((puntosMinimos > puntosCompu)) {
            alert('Computadora Gana');
        } else if (puntosCompu > 21) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana');
        }
    }, 15);

}

//eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);
    if (puntosJugador > 21) {
        console.warn('LOL, perdiste');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);


    } else if (puntosJugador === 21) {
        alert('Ganaste!');
        console.warn('Ganaste!');
        btnPedir.disabled = true;
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);



})


btnNuevo.addEventListener('click', () => {

    console.clear();
    deck =[];
    deck = crearDeck();
    puntosCompu = 0;
    puntosJugador = 0
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText= 0;
    divCartasComputadoras.innerHTML ='';
    divCartasJugador.innerHTML ='';
    btnPedir.disabled = false;
    btnDetener.disabled = false;

})