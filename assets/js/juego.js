let deck = [];
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K'];
let puntosJugador =0,
puntosCompu =0;

//Ref HTML

const btnPedir = document.querySelector('#btnPedir');

const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelectorAll('jugador-cartas')
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



//eventos

btnPedir.addEventListener('click', () => {
    
    const carta =pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;


    divCartasJugador.append()
})