/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//variable which calls a new game object 
const game = new Game();
//video and audio will be used foe the background
const audio = new Audio('source/RetroElectro.ogg');
$('.main-container')
    .prepend(`
<video autoplay muted loop id="myVideo">
    <source src="source/OutrunGrid.mp4" type="video/mp4">
</video>
`);
//on and off switch added to the page/will be used to play and pause the music
//on and off switch from https://proto.io/freebies/onoff/ 
$(`
<div class="onoffswitch">
    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
    <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
    </label>
</div>
`).insertBefore($('#banner'));
//css for the back ground video to adjust it to the page
$('#myVideo').css({
    'position': "fixed",
    'display': "block",
    'z-index': '-100',
    'min-width': '100%',
    'min-height': '100%',
    'left': '50%',
    'top': '50%',
    'transform': 'translate(-50%, -50%)'
});
//listener for teh start button which start the game and hide the overlay
$('#btn__reset').click(function() {
    game.startGame();
    $('#overlay').fadeOut();
});
/*page will listen for the keys pressed and pass in key value 
which produce a character expect for Alt, Shift, Ctrl, or Meta
(value passed to handleInteraction method)
*/
$(document).keypress((e) => {
    const this1 = e.key;
    game.handleInteraction(this1);
});
/*
listener for on screen keyBoard which will pass in
the textContent of each letter clicked to handleInteraction method
*/
$('#qwerty').click((e) => {
    const this1 = e.target;
    if (this1.tagName === 'BUTTON') {
        game.handleInteraction(this1.textContent);
    }
});

/**
 listener for the on off switch will play/adjust
the sound or pause the music when clicked
 */
$('#myonoffswitch').on('change', (e) => {
    const this1 = e.target;
    if ($(this1).is(':checked')) {
        audio.play();
        audio.volume = 0.1;
    } else {
        audio.pause();
    }
});