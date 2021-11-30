// 'use strict';

import Search from '../SearchSystem/search.js';
import Utils from '../UtilsElt/UtilsBase.js';
import tags from './TagSystem.js';

export default class htmlRender {
    // build the section containing the recipes to display
    static buildRecipes(collections) {
        // console.log(collections)
        return collections.forEach(recipe => {
            this.buildRecipe(recipe);
        });
    }

    // build system for each recipe
    static buildRecipe(recipe) {
        let section = document.getElementById('mainContent');
        return section.appendChild(this.createSectionElt(recipe));
    }

    // create the article with informations
    static createSectionElt(recipe) {
        let createSection = document.createElement('div');
        let dataFilterIngredients = recipe.ingredients.map(element => Utils.normalizeText(element.ingredient));
        let dataFilterAppliances = Utils.normalizeText(recipe.appliance);
        let dataFilterUstensils = recipe.ustensils;
        let dataFilter = recipe.ingredients.map(element => Utils.normalizeText(element.ingredient)) + recipe.ustensils + Utils.normalizeText(recipe.appliance);

        createSection.classList.add('col-3.5');

        createSection.classList.add('articleRecipes');
        createSection.setAttribute('data-filter', dataFilter);
        createSection.setAttribute('data-filter-ingredient', dataFilterIngredients);
        createSection.setAttribute('data-filter-appliances', dataFilterAppliances);
        createSection.setAttribute('data-filter-ustensils', dataFilterUstensils);
        createSection.innerHTML = this.getArticleInnerHTML(recipe);

        return createSection;
    }

    static getArticleInnerHTML(recipe) {
        return `
            <img src='https://res.cloudinary.com/dlpyn3wxf/image/upload/v1619104039/img-recipes_tqi94t.png' alt='img' />
            <div class='recipeTitle'>
                <h2 class='recipeName'>${recipe.name}</h2>
                <span class='recipeDuration'><i class='far fa-clock'></i>${recipe.time} min</span>
            </div>
            <div class='recipeInfo'>
                <div class='recipeIngredients'>${recipe.ingredients.map(elt => `
                    <p><b>${elt.ingredient} </b>:
                    ${ 'quantity' in elt ? elt.quantity : ''}
                    ${ 'unit' in elt ? elt.unit: ''}</p>`).join(' ')}
                </div>
                <div class='recipeInstructions'>
                    <span>${recipe.description}</span>
                </div>
            </div>
        `;
    }

    // HTML rendering of filters and their content
    static buildBlocKTags(tabAllTags, typeTag){
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

        let eltul = document.createElement('ul');
        eltul.setAttribute('id', typeTag + 'Example');
        eltdiv2.appendChild(eltul, tabAllTags);

        this.rendertaglist(eltul, tabAllTags)
        this.afficher(typeTag);
    }

     static rendertaglist(eltul, tabAllTags) {
        tabAllTags.forEach(tag => {
            let eltli=document.createElement('li');
            eltul.appendChild(eltli);
            eltli.innerHTML = tag;
        })
    }
    
    static updateTagList(recipesMatched, typeTag, event){
        // console.log(recipesMatched, event.target)
        Utils.clearTagsList(typeTag);
        let tabTagsList = []

        if( typeTag == "ingredient"){
            recipesMatched.forEach( ings => {
                for(let ing of ings.ingredients){
                    let elt=ing.ingredient
                    elt=elt.toLowerCase()*
                    tabTagsList.push(elt)
                }
            })
            tabTagsList = new Set(tabTagsList);

        } else if(typeTag == "ustensil"){
            recipesMatched.forEach( usts => {
                for(let ust of usts.ustensils){
                    let elt=ust
                    elt=elt.toLowerCase()
                    tabTagsList.push(elt)
                }
            })
            tabTagsList = new Set(tabTagsList);

        }else if(typeTag == "appliance"){
            recipesMatched.forEach( elt => {
                let elt2=elt.appliance
                elt2=elt2.toLowerCase()
                tabTagsList.push(elt2)
            })
            tabTagsList = new Set(tabTagsList);
        }
        
        // console.log(tabTagsList); 
        
        tabTagsList.forEach( tag =>{
            let eltul = document.getElementById(typeTag + 'Example');
            let eltli=document.createElement('li');
            eltul.appendChild(eltli);
            eltli.innerHTML = tag;
        })
        // this.afficher(typeTag);
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