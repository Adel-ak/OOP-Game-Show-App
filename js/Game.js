/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
//global variable used in multi methods
const onScreenKey = document.querySelectorAll('#qwerty div button');
const overlay = document.querySelector('#overlay');
const lifes = document.querySelectorAll('.tries');
/*
 the Game class
 missed property will hold the mistake points
 phrases property will hold and array of Phrases
 activePhrase property will hold the Phrase that will be displayed in the screen
*/
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [];
        this.activePhrase = null;
    }
    /**
     * createPhrases creates Phrases and loops through gamePhrase array and push it 
       all to this.phrases array with a loop
     */
    createPhrases() {
        const gamePhrase = [
            'Marty I need you to go back with me',
            'Doc uh are you telling me you built a time machine out of a DeLorean',
            'I burned through all of my extra lives in a matter of minutes',
            'Going outside is highly overrated',
            'No one in the world gets what they want and that is beautiful',
            'Life is just a chance to grow a soul',
            'Only a life lived for others is a life worthwhile',
            'Expect nothing live frugally on surprise',
            'Because I have loved life I shall have no sorrow to die',
            'People living deeply have no fear of death',
            'Everything has beaut but not everyone sees it',
            'Success is the best revenge for anything',
            'Dont stumble over something behind you',
            'If you judge people you have no time to love them'
        ];

        gamePhrase.forEach(phrase => {
            return this.phrases.push(phrase);
        });
    }
    /**
     * starts game by fading out the overlay
     * resets everything
     * creates Phrases
     * and sets activePhrase with a Phrases and diaplays it in the screen 
     */
    startGame() {
        $('#overlay').fadeOut();
        this.reset();
        this.createPhrases();
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }
    /**
     *  @return random Phrase from the phrases array property
     */
    getRandomPhrase() {
        const randomPhrase = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomPhrase];
    }
    /**
     * 
     * @param {event} inputKey value from the keypress and e.target textContent
     * loops throug each latter in dispay and pushs it to text array 
     * which will be used to check if the on screen keys matchs the clicked key and the text in the array
     * to add the chosen/wrong class to the screen keys and disables them and 
     * if its chosen it will add class and disable
     * if its wrong it will plus 1 to missed, add class and disble
     */
    handleInteraction(inputKey) {
        let isMatch = this.activePhrase.checkLetter(inputKey);
        const keyPressed = $(`.key:contains("${inputKey}")`);
        if (isMatch) {
            $(keyPressed).addClass('chosen');
            $(keyPressed).prop("disabled", true);
            this.activePhrase.showMatchedLetter(inputKey);
        } else {
            //if the key on screen has the class 'wrong' and it was clicked again dont plus 1 to missed
            if (!($(keyPressed).hasClass('wrong'))) {
                this.missed += 1;
            }
            $(keyPressed).addClass('wrong');
            $(keyPressed).prop("disabled", true);
        }
        this.removeLife();
        this.checkForWin();
    }
    /**
     * removes life if user makes a mistake and changing the heart image to white
     * checks if imag has class name hurt to stop a the explode effect which is cause by keypress
     * adds the class name hurt to the img element
     * shows the white heart with the show explode effect
     * call this.gameOver(); to check if user have won or lost
     */
    removeLife() {
        //to aviod error in console untill player guess wrong
        if (this.missed > 0) {
            const img = lifes[this.missed - 1].firstElementChild;
            img.src = 'source/lostHeart.png';
            if (img.className !== 'hurt') {
                $(img).effect("explode");
            }
            img.className = 'hurt';
            $(img).show("explode");
        }
        this.gameOver();
    }
    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        const shown = document.querySelectorAll('.show');
        const onScreenLetters = document.querySelectorAll('.letter');
        if (shown.length === onScreenLetters.length) {
            this.gameOver(true);
        }
    }
    /**
     * checks if missed score is 5 so the game can end and show overlay 
     * with a lose message and rests the game or check if boolen 
     *@param {boolean} True passed in checkfoWin to show overlay with a win message if won
     */
    gameOver(boolen) {
        if (this.missed === 5) {
            overlay.className = 'lose';
            overlay.firstElementChild.textContent = 'Finish what you started Phrase Hunter ?';
            $('#overlay').fadeIn();
        }
        if (boolen) {
            overlay.className = 'win';
            overlay.firstElementChild.textContent = 'Nice!! Go back in Phrase Hunter ?';
            $('#overlay').fadeIn();
        }
    }
    /**
     * resets the game but resting the lost life, missed score, 
     * removing wrong/chosen class and un disable the keys
     */
    reset() {
        this.missed = 0;
        lifes.forEach(life => {
            const resetImg = life.firstElementChild;
            resetImg.className = '';
            resetImg.src = 'source/liveHeart2.png';
        });
        onScreenKey.forEach(resetKey => {
            resetKey.className = 'key';
            resetKey.disabled = false;
        })
        lifes[4].firstElementChild.className = 'hurt';
    }
}