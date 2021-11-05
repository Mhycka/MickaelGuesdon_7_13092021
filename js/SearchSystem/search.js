// 'use strict';

import Utils from '../UtilsElt/UtilsBase.js';
import MessageAlert from '../Page/Message.js';
import sectionRecipesCard from '../Page/HtmlRender.js';

export default class Search {
    static searchBuilder(){
        document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;

            if (Utils.isValid(valueSearch)) {
                let result = this.searchMainInput(valueSearch);
                // console.log(valueSearch, valueSearch.length)

                if (result.recipesMatchedArray.length === 0) {
                    return MessageAlert.buildResultMessageWithNoResult();
                }
                Utils.clearRecipesSection();
                this.initSearch(result);
                return;
            } else if (valueSearch.length < 3) {
                MessageAlert.hideMessage();
                sectionRecipesCard.buildResult(recipesData);
                return;
                
            }
            // Reset Build system
            Utils.clearRecipesSection();
        })
    }

    static searchMainInput(value) {
        let recipesMatchedArray = [];
        for (const recipe of recipesData){
            if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) || Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) || recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
                recipesMatchedArray.push(recipe);
            }
        }
        return {
            'recipesMatchedArray': recipesMatchedArray
        };       
    }

    //Filter les recipes par rapport au tag -> rebuild html

    static initSearch(result) {
        sectionRecipesCard.buildResult(result.recipesMatchedArray);
        MessageAlert.buildResultMessageWithResult(result.recipesMatchedArray);
    }
}