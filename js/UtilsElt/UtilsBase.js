// 'use strict';

export default class Utils {
    // search starts from 3 characters
    static isValid(value) {
        return value.length > 2;
    }

    // transform the text into lowercase
    static normalizeText(text) {
        return text
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, "");
    }

    // transform the text into uppercase
    static upperText(text) {
        return text
            .charAt(0)
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") +
            text
            .substring(1)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    static clearRecipesSection() {
        return document.getElementById('mainContent').innerHTML = '';
    }

    static clearTagsList(typeTag) {
        return document.getElementById(typeTag + 'Example').innerHTML='';
    }

    // Collect all recipes of categories
    static sortByTitle(array) {
        let arrayNoSort = [...new Set(array)];
        let arraySort = arrayNoSort.sort((a, b) => {
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        })
        return arraySort;
    }

    static hideButtonsOnClick(btn, open, hide) {
        this.hideBtn(btn);
        this.displayArrow(open);
        this.hideHidden(hide);
    }

    static displayBtn(btn){
        if(screen.width <= 576) {
            btn.style.width = "11rem";
        } else {
            return btn.style.width = "35rem";
        }
    }

    static hideBtn(btn) {
        return btn.style.width = "11rem";
    }

    static displayArrow(open) {
        return open.style.display = 'block';
    }

    static hideArrow(open){
        return open.style.display = 'none';
    }

    static displayHidden(hide){
        return hide.style.display = 'block';
    }

    static hideHidden(hide) {
        return hide.style.display = 'none';
    }
}