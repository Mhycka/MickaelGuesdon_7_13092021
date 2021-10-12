// 'use strict';

import button from '../page/button.js';
import sectionRecipesCard from '../Page/sectionRecipes.js';
import MessageAlert from '../page/Message.js';
import Search from '../SearchSystem/search.js';
import Tags from '../Page/TagSystem.js';
import Utils from '../UtilsElt/UtilsBase.js';
import Logic from '../UtilsElt/Logic.js';

export default class Ingredients {
    static ingredientsEx = document.getElementById('ingredientsExample');

    static init(ingredients, recipes) {
        Utils.clearFilters(this.ingredientsEx);
        button.launchButtons(document.querySelector("#ingredientsElt > button"),
            document.querySelector("#openIngredientsFilter"),
            document.querySelector("#closeIngredientsFilter"),
            document.querySelector("#ingredientsHide"));
        this.fillIngredients(Utils.sortByTitle(ingredients));
        this.searchInput(ingredients);
        this.filterTags(recipes);
    }

    // display system for ingredients
    static fillIngredients(ingredients) {
        let ul = document.createElement('ul');
        ul.classList.add('listUlIng');
        this.ingredientsEx.appendChild(ul);

        ingredients.forEach((ingredient) => {
            let listIngredients = document.createElement('li');
            
            ul.appendChild(listIngredients);
            listIngredients.innerHTML = `${ingredient}`
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        });
    }

    // allows systems to search ingredients
    static searchInput(ingredients) {
        document.getElementById('inputIngredients').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;
            Utils.clearFilters(this.ingredientsEx);
            this.fillIngredients(
                Utils.isValid(valueSearch) ?
                Search.searchInputFilters(ingredients, valueSearch) :
                Utils.sortByTitle(ingredients));
        });
    }

    static filterTags(recipes) {
        let selected = [];
        let ingredientTag = document.getElementById('tagsBadges');
        // console.log(recipes)

        document.querySelector('#ingredientsExample').addEventListener('click', (event) => {
            let classValue = event.target.classList.value;
            // console.log(event.target)
            
            if (-1 === classValue.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                button.hideButtonsOnClick(document.querySelector("#ingredientsElt > button"),
                    document.querySelector("#openIngredientsFilter"),
                    document.querySelector("#ingredientsHide"))
                Tags
                    .buildTags(ingredientTag,(event.target.getAttribute('data-filter')))
                    // .removeTagsOnClick(document.querySelector("#ingredientTag > i"), event, ingredientTag, recipes);
                MessageAlert.buildResultMessageWithResult(Search.searchByIngTags(recipes, selected));
                Utils.clearRecipesSection();
                let result = Search.searchByIngTags(recipes, selected);
                sectionRecipesCard.buildResult(result);
                Utils.clearFilters(this.ingredientsEx);
                this.fillIngredients(Utils.sortByTitle(Logic.getAllIngredients(result)));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                Tags.resetSection(event, ingredientTag, recipes);
            };
        });
        return selected;
    }
}