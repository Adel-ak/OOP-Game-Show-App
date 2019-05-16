/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */


/**
 * the Phrase class 
 * which accpets a phrase property and will hold a phrase coming from the game class
 * addPhraseToDisplay adds the phrase to the html page by looping through each letter 
 * showMatchedLetter shows each latter that is guessed and chaning the class name from hide to show
 * checkLetter checks if the letter inputed by the user is in the in the phrase
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

    checkLetter(keyValue) {

        if (this.phrase.toLowerCase().includes(keyValue)) {
            return true;
        } else {
            return false
        }
    }

    showMatchedLetter(alphabet) {
        let changeClass = document.querySelectorAll(`.${alphabet}`);
        changeClass.forEach(ele => ele.className = `show letter ${alphabet}`);
    }
}