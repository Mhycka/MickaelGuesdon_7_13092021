// 'use strict';

export default class MessageAlert {
    static resultMessage = document.getElementById('resultMessage');
    static resultSpan = document.querySelector('#resultMessage > span');

    // display message alert true
    static buildResultMessageWithResult(recipes) {
        this.displayMessage();
        this.resultMessage.style.backgroundColor = '#c4dcff'
        this.resultSpan.innerHTML = recipes.length + ' recette(s) correspond(ent) à votre recherche';
        this.hideMessageOnClick();
        return this;
    }

    // displays the message alert false
    static buildResultMessageWithNoResult() {
        this.displayMessage();
        this.resultMessage.style.backgroundColor = '#FFE9A5';
        this.resultSpan.innerHTML = 'Aucune recette ne correspond à votre recherche... Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
        return this;
    }

    // message with number of recipes
    static displayMessage() {
        return this.resultMessage.style.display = 'flex';
    }

    // remove message
    static hideMessage() {
        return this.resultMessage.style.display = 'none';
    }

    static hideMessageOnClick() {
        document.querySelector("#resultMessage > i").addEventListener('click', () => {
            return this.hideMessage();
        })
    }
}