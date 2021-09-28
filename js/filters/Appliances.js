'use strict';

import button from '../Page/button';
import Logic from '../Utils/Logic';
import sectionRecipes from '../Page/sectionRecipes';
import Message from '../Page/Message';
import Search from '../SearchSystem/search';
import Tags from '../Page/TagSystem';
import Utils from '../Utils/UtilsBase';

export default class Appliances {
    static appliancesExample = document.getElementById('appareilExample');

    static init(appliances, recipes) {
        Utils.clearFilters(this.appliancesExample);
        button.launchButtons(document.querySelector("#appareil > button"),
            document.querySelector("#openAppareilFilter"),
            document.querySelector("#closeAppareilFilter"),
            document.querySelector("#hiddenAppareilFilter"));
        this.fillAppliances(Utils.sortByTitle(appliances));
        this.searchInput(appliances);
        this.filterTags(recipes);
        return this;
    }

    // display the appliances in the appliances zone according to the recipes displayed in the 'recipes' section
    static fillAppliances(appliances) {
        let ul = document.createElement('ul');
        ul.classList.add('listUlApp');
        this.appliancesExample.appendChild(ul);

        appliances.forEach((appliances) => {
            let listAppliances = document.createElement('li');

            listAppliances.innerHTML = `${Utils.upperText(appliances)}`
            ul.appendChild(listAppliances);
            listAppliances.classList.add('list-appareil');
            listAppliances.setAttribute('data-filter', `${appliances}`);
        });
    }

    // allows to search for the appliances in the input from the appliances present in the recipes displayed
    static searchInput(appliances) {
        document.getElementById('inputAppareil').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            Utils.clearFilters(this.appliancesExample);
            this.fillAppliances(
                Utils.isValid(valueSearch) ?
                Search.searchInputFilters(appliances, valueSearch) :
                Utils.sortByTitle(appliances));
        });
    }

    static filterTags(recipes) {
        let selected = [];
        let appareilTag = document.getElementById('appareilTag');

        document.querySelector('#appareilExample').addEventListener('click', (event) => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                button.hideButtonsOnClick(document.querySelector("#appareil > button"),
                    document.querySelector("#openAppareilFilter"),
                    document.querySelector("#hiddenAppareilFilter"))
                Tags
                    .buildTags(appareilTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removeTagsOnClick(document.querySelector("#appareilTag > i"), event, appareilTag, recipes);
                Message.buildResultMessageWithResult(Search.searchByAppTags(recipes, selected));
                Utils.clearRecipesSection();
                sectionRecipes.buildResult(Search.searchByAppTags(recipes, selected));
                Utils.clearFilters(this.appliancesExample);
                this.fillAppliances(Utils.sortByTitle(Logic.getAllAppliances(Search.searchByAppTags(recipes, selected))));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                Tags.resetSection(event, appareilTag, recipes);
            };
        });
        return selected;
    }
}