/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */


/**
 * the Phrase class 
 * which accpets a phrase property and will hold a phrase coming from the game class
 * addPhraseToDisplay adds the phrase to the html page by looping through each letter 
 * showMatchedLetter shows each latter that is guessed and chaning the class name from hide to show
 * checkLetter checks if the letter inputed by the user is in the in the phrase and calls showMatchedLetter to diaplay after checking
 */
class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    addPhraseToDisplay() {
        const phraseDiv = document.querySelector('#phrase ul');
        let html = '';
        for (let i = 0; i < this.phrase.length; i++) {
            if (this.phrase.charAt(i) !== ' ') {
                html += `<li class="hide letter ${this.phrase.charAt(i).toLowerCase()}">${this.phrase.charAt(i)}</li>`;
            } else if (this.phrase.charAt(i) === ' ') {
                html += `<li class="hide space"> </li>`;
            }
        }
        return phraseDiv.innerHTML = html;
    }
    showMatchedLetter(alphabet) {
        let changeClass = document.querySelectorAll(`.${alphabet}`);
        changeClass.forEach(ele => ele.className = `show letter ${alphabet}`);
    }

    checkLetter(keyValue) {
        const letter = [];
        for (let i = 0; i < this.phrase.length; i++) {
            letter.push(this.phrase.charAt(i).toLowerCase())
            if (keyValue === letter[i]) {
                this.showMatchedLetter(letter[i]);
            }
        }
    }
}