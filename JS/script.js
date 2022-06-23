'use strict'


document.addEventListener('DOMContentLoaded', setup)



let tileSequence;
let clickingEnabled = false;
let gameOver = false;
let roundClicks = 0;


function setup() {

    tileSequence = new Map()
    playRound()

    let allTiles = document.querySelectorAll('td')
    allTiles.forEach(element => {
        element.addEventListener('click', evt => {
            if (clickingEnabled) {
                clickTile(evt)
            }
        })
    });

}
//light the tile up

function clickTile(evt) {

    roundClicks++;
    const tile = evt.target

    //console.log(evt.target.getAttribute("id") + "id test")
    console.log(evt.target.getAttribute('id') === tileSequence.get(roundClicks))
    // evt.target.getAttribute('id') === tileSequence.get(roundClicks)
    if (evt.target.getAttribute('id') === tileSequence.get(roundClicks)) {
        tile.style.backgroundColor = 'rgb(0,255,0)'
        setTimeout(() => {
            tile.style.backgroundColor = 'black'

        }, 250);

    } else {
        tile.style.backgroundColor = 'rgb(255,0,0)'
        gameOver = true;
        tileSequence.clear()
        document.querySelector('#message').textContent = 'GAME OVER!'
        document.querySelector('#message').style.Color = 'rgb(255,0,0)'
        clickingEnabled = false;

    }
    if (tileSequence.size === roundClicks && !(gameOver)) {
        playRound()
    }



    //addToSequence()
    //console.log(tileSequence)


}
/**generates a random number from 1 to 16 (integer)
*
* @returns {int}
*/

function randomOneToNine() {
    let randomNumber = Math.random() * 16
    return Math.floor(randomNumber) + 1
}


function addToSequence() {
    const randomTileNumber = randomOneToNine()
    tileSequence.set(tileSequence.size + 1, 'tile-${randomTileNumber}')
}

function lightSequence() {
    clickingEnabled = false;
    document.querySelector('table').style.borderColor = 'rgb(255,178,0)'
    console.log('function light called');
    setTimeout(() => {
        clickingEnabled = true;
        roundClicks = 0;
        console.log(tileSecquence.size)
        document.querySelector('table').style.borderColor = 'rgb(255,255,255)'
        document.querySelector('#message').textContent = 'cick!!'


    }, (tileSequence.size + 1.5) * 1000)
    tileSequence.forEach((value, key) => {
        const tile = document.querySelector('#${value}')
        console.log(tile)
        setTimeout(() => {
            lightTile(tile)
        }, 1000 * key);

    })
}


function lightTile(tile) {

    tile.style.backgroundColor = 'rgb(0,170,170)'

    //addToSequence()
    console.log(tileSequence)

    setTimeout(() => {
        tile.style.backgroundColor = 'black'
        playBeepSfx()
    }, 250);

}

function playRound() {

    addToSequence()
    document.querySelector('#round-heading').textContent = 'Round ${tileSequence.size()}'
    lightSequence()



}

function playBeepSfx() {
    const beepSfx = new Audio('misc/mixkit-neutral-boy-pinbal-tone-3137.wav')
    beepSfx.play()
}
playBeepSfx();
