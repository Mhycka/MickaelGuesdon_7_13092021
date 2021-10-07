// 'use strict';

import button from '../Page/button.js';
import Logic from '../UtilsElt/Logic.js';
import sectionRecipesCard from '../Page/sectionRecipes.js';
import MessageAlert from '../Page/Message.js';
import Search from '../SearchSystem/search.js';
import Tags from '../Page/TagSystem.js';
import Utils from '../UtilsElt/UtilsBase.js';

export default class Appliances {
    static appliancesEx = document.getElementById('appliancesExample');

    static init(appliances, recipes) {
        // console.log(appliances, recipes)
        Utils.clearFilters(this.appliancesEx);
        button.launchButtons(document.querySelector("#appliancesElt > button"),
            document.querySelector("#openAppliancesFilter"),
            document.querySelector("#closeAppliancesFilter"),
            document.querySelector("#appliancesHide"));
        this.fillAppliances(Utils.sortByTitle(appliances));
        this.searchInput(appliances);
        this.filterTags(recipes);
        return this;
    }

    // display system for the appliances
    static fillAppliances(appliances) {
        // console.log(appliancesExample)
        let ul = document.createElement('ul');
        ul.classList.add('listUlApp');
        this.appliancesEx.appendChild(ul);

        appliances.forEach((appliances) => {
            let listAppliances = document.createElement('li');

            listAppliances.innerHTML = `${appliances}`
            ul.appendChild(listAppliances);
            listAppliances.classList.add('list-Appliances');
            listAppliances.setAttribute('data-filter', `${appliances}`);
        });
    }

    // allows system for search input's appliances
    static searchInput(appliances) {
        document.getElementById('inputAppliances').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            Utils.clearFilters(this.appliancesEx);
            this.fillAppliances(
                Utils.isValid(valueSearch) ?
                Search.searchInputFilters(appliances, valueSearch) :
                Utils.sortByTitle(appliances));
        });
    }

    static filterTags(recipes) {
        let selected = [];
        let AppliancesTag = document.getElementById('appliancesTag');

        document.querySelector('#appliancesExample').addEventListener('click', (event) => {
            let classValue = event.target.classList.value;
            // console.log(classValue)


            if (-1 === classValue.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                button.hideButtonsOnClick(document.querySelector("#appliancesElt > button"),
                    document.querySelector("#openAppliancesFilter"),
                    document.querySelector("#appliancesHide"))
                Tags
                    .buildTags(AppliancesTag,(event.target.getAttribute('data-filter')))
                    .removeTagsOnClick(document.querySelector("#appliancesTag > i"), event, AppliancesTag, recipes);
                MessageAlert.buildResultMessageWithResult(Search.searchByAppTags(recipes, selected));
                Utils.clearRecipesSection();
                sectionRecipesCard.buildResult(Search.searchByAppTags(recipes, selected));
                Utils.clearFilters(this.appliancesEx);
                this.fillAppliances(Utils.sortByTitle(Logic.getAllAppliances(Search.searchByAppTags(recipes, selected))));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                Tags.resetSection(event, AppliancesTag, recipes);
            };
        });
        return selected;
    }
}