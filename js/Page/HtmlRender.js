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

    // HTML rendering of filters and their content
    static render(tabAllTags, typeTag){
        let filter =document.getElementById('filter');
        let eltdiv = document.createElement('div');
        eltdiv.setAttribute('id', typeTag +'Elt');
        filter.appendChild(eltdiv);
        
        let createBtn = document.getElementById(typeTag + 'Elt');
        let eltBtn = document.createElement('button');
        eltBtn.innerHTML= typeTag+ 's';
        createBtn.appendChild(eltBtn);


        let chevronOpen = document.createElement('i');
        chevronOpen.setAttribute('class', 'fas fa-chevron-down');
        chevronOpen.setAttribute('id', typeTag + 'OpenFilter');
        eltBtn.appendChild(chevronOpen);

        let eltdivHide = document.createElement('div');
        eltdivHide.setAttribute('id', typeTag + 'Hide');
        createBtn.appendChild(eltdivHide);

        let createInput = document.getElementById(typeTag + 'Hide');
        let eltLabel = document.createElement('label');
        let eltInput = document.createElement('input');
        let chevronClose = document.createElement('i');
        let eltdiv2 = document.createElement('div');
        eltLabel.setAttribute('for', typeTag + 'Input');
        eltInput.setAttribute('type', 'search');
        eltInput.setAttribute( 'id', typeTag + 'Input');
        eltInput.setAttribute('aria-label', 'Search through ' + typeTag);
        eltInput.setAttribute('placeholder', 'Search a ' + typeTag);
        chevronClose.setAttribute('class', 'fas fa-chevron-up');
        chevronClose.setAttribute('id', typeTag + 'CloseFilter');
        createInput.appendChild(eltLabel);
        createInput.appendChild(eltInput);
        createInput.appendChild(chevronClose);
        createInput.appendChild(eltdiv2);

        // let liste = document.getElementById(this.typeTag + 'Example');
        let eltul = document.createElement('ul');
        eltul.setAttribute('id', typeTag + 'Example');
        eltdiv2.appendChild(eltul);
        // eltul.appendChild(liste);
        
        for(let tag of tabAllTags){
            let eltli=document.createElement('li');
            eltul.appendChild(eltli);
            eltli.innerHTML = tag;
        }
        this.afficher(typeTag);
        // this.searchInput(recipes);
    }

// Display and event linked to the category filter button
    static afficher(typeTag){
        let launchBtn = document.getElementById(typeTag + 'Elt').childNodes[0];
        let openBtn = document.getElementById(typeTag + 'OpenFilter');
        let closeBtn = document.getElementById(typeTag + 'CloseFilter');
        let hideBtn = document.getElementById (typeTag + 'Hide');

        launchBtn.addEventListener('click', () => {
            Utils.displayBtn(launchBtn);
            Utils.hideArrow(hideBtn);
            Utils.displayHidden(hideBtn);
        })

        closeBtn.addEventListener('click', () => {
            Utils.hideButtonsOnClick(launchBtn, openBtn, hideBtn);
        })
    }
}