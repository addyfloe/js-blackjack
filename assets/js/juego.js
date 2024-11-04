// Patron modular para evitar al usuario modificar el deck

(() => {
    'use strict'


    let deck = [];
    const tipos = ['C', 'D','H','S'];
    const especiales = ['A','J','Q','K'];
    
    let puntosJugador = 0,
        puntosComputadora = 0;
    
    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
            btnNuevo = document.querySelector('#btnNuevo'),
            btnDetener = document.querySelector('#btnDetener');
    
    const divCartasJugador = document.querySelector('#jugador-cartas'),
            divCartasComputadora = document.querySelector('#computadora-cartas'),
            smalls = document.querySelectorAll('small');
            
// Esta funcion inicializa el juego
    const inicializarJuego = () =>{
            crearDeck();
        }
    
    
    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
    
        deck = [];
        for(let i = 2; i <= 10; i++) {
            for(let tipo of tipos) {
            deck.push (i + tipo);
            }
        }
    
        for( let tipo of tipos){
            for( let esp of especiales ) {
                deck.push ( esp + tipo)
            }
        }
    
        return _.shuffle(deck);
    }
    
    
    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {
    
        if(deck.length ===0){
            throw 'No hay cartas en el deck'
        }
        
        const carta = deck.pop();
        return carta;
    }
    
       // pedirCarta();
       const valorCarta = ( carta ) => {
    
            const valor = carta.substring(0, carta.length - 1);
            return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1
            }
    
    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
       do {
            const carta = pedirCarta();
    
            puntosComputadora = puntosComputadora + valorCarta(carta);
            smalls[1.].innerText = puntosComputadora;
    
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta')
            divCartasComputadora.append (imgCarta);
    
            if( puntosMinimos > 21){
                break;
            }
    
       } while (( puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21));
    
    
       setTimeout(() => {
    
    
       if( puntosComputadora === puntosMinimos ){
        alert ('Nadie gana :(');
       } else if( puntosMinimos > 21){
        alert ('Computadora gana');
       } else if (puntosComputadora >21){
        alert('Jugador gana!');
       } else {
        alert('Computadora gana');
       }
    
        }, 10);
    
        }
    
           
    // Eventos
    btnPedir.addEventListener('click', () =>{      
    
        const carta = pedirCarta();
    
        puntosJugador = puntosJugador + valorCarta(carta);
        smalls[0.].innerText = puntosJugador;
    
    
    // <img class= carta src="assets/cartas/2D.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugador.append (imgCarta);
    
        if (puntosJugador > 21){
            console.warn('Lo sieto, perdiste');
            btnPedir.disabled = true
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    
    });
    
    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    
        turnoComputadora(puntosJugador);
    
    });
    
    btnNuevo.addEventListener('click', () =>{
    
        console.clear();
        deck = [];
        deck = crearDeck();
    
            puntosJugador = 0;
            puntosComputadora = 0;
            
            smalls[0].innerText = 0; 
            smalls[1].innerText = 0;
    
            divCartasComputadora.innerHTML = '';
            divCartasJugador.innerHTML = '';
    
            btnPedir.disabled = false
            btnDetener.disabled = false;
    });

})();




