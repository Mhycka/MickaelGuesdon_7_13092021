// 'use strict';

import Utils from '../UtilsElt/UtilsBase.js';

export default class sectionRecipesCard {
    // build the section containing the recipes to display
    static buildResult(collections) {
        return collections.forEach(collection => {
            this.buildRecipe(collection);
        });
    }

    // build system for each recipe
    static buildRecipe(collection) {
        let section = document.getElementById('mainContent');
        return section.appendChild(this.createSectionElt(collection));
    }

    // create the article with informations
    static createSectionElt(collection) {
        let createSection = document.createElement('div');
        let dataFilterIngredients = collection.ingredients.map(element => Utils.normalizeText(element.ingredient));
        let dataFilterAppliances = Utils.normalizeText(collection.appliance);
        let dataFilterUstensils = collection.ustensils;
        let dataFilter = collection.ingredients.map(element => Utils.normalizeText(element.ingredient)) + collection.ustensils + Utils.normalizeText(collection.appliance);

        // console.log(article, dataFilterAppliances)

        createSection.classList.add('col-3.5');

        createSection.classList.add('articleRecipes');
        createSection.setAttribute('data-filter', dataFilter);
        createSection.setAttribute('data-filter-ingredient', dataFilterIngredients);
        createSection.setAttribute('data-filter-appliances', dataFilterAppliances);
        createSection.setAttribute('data-filter-ustensils', dataFilterUstensils);
        createSection.innerHTML = this.getArticleInnerHTML(collection);

        return createSection;
    }

    static getArticleInnerHTML(collection) {
        return `
            <img src='https://res.cloudinary.com/dlpyn3wxf/image/upload/v1619104039/img-recipes_tqi94t.png' alt='img' />
            <div class='recipeTitle'>
                <h2 class='recipeName'>${collection.name}</h2>
                <span class='recipeDuration'><i class='far fa-clock'></i>${collection.time} min</span>
            </div>
            <div class='recipeInfo'>
                <div class='recipeIngredients'>${collection.ingredients.map(elt => `
                    <p><b>${elt.ingredient} </b>:
                    ${ 'quantity' in elt ? elt.quantity : ''}
                    ${ 'unit' in elt ? elt.unit: ''}</p>`).join(' ')}
                </div>
                <div class='recipeInstructions'>
                    <span>${collection.description}</span>
                </div>
            </div>
        `;
    }
}