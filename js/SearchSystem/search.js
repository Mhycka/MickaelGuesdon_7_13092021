// 'use strict';

import Utils from '../UtilsElt/UtilsBase.js';
import MessageAlert from '../Page/Message.js';
import htmlRender from '../Page/HtmlRender.js';
import tags from '../Page/TagSystem.js';

export default class Search {
    static searchBuilder(){
        document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
            let valueSearch = key.target.value;

            if (Utils.isValid(valueSearch)) {
                let result = this.searchMainInput(valueSearch);

                if (result.recipesMatchedArray.length === 0) {
                    return MessageAlert.buildResultMessageWithNoResult();
                }
                Utils.clearRecipesSection();
                this.initSearch(result);
                return;
            } else if (valueSearch.length < 3) {
                MessageAlert.hideMessage();
                htmlRender.buildRecipes(recipesData);
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

    static builderSearchTag(typeTag, event){
        let tagData = [];
        let tags = document.querySelectorAll('#tagsBadges span');
        
        console.log('error')

        for(const tag of tags){
            tagData.push( Utils.normalizeText(tag.textContent));
        }

        // console.log(tagData)

        this.searchFilterTag(tagData, typeTag, event);

        if (tagData.length === 0) {
            return MessageAlert.buildResultMessageWithNoResult();
        }
    }

    static searchFilterTag(tags, typeTag, event){
        let recipesMatchedTagArray = [];
        let recipesMatchedTagArray2 = [];
        let i = 0;

        console.log('test ok')

        for(const tag of tags){
            let tagText = tag;
            // console.log(i)
            if( i == 0){
                // console.log('first' ,  i )
                for(const recipe of recipesData){
                    
                    let recipeName = Utils.normalizeText(recipe.name);
                    let recipeDescription = Utils.normalizeText(recipe.description);
                    let searchNotFinish = true;

                    if(recipeName.includes(tagText) || recipeDescription.includes(tagText)) {
                        recipesMatchedTagArray.push(recipe);
                        searchNotFinish = false;
                    }

                    if(searchNotFinish){
                        for(const ingredient of recipe.ingredients){
                            let recipeIng = Utils.normalizeText(ingredient.ingredient);
                            if(recipeIng.includes(tagText)){
                                recipesMatchedTagArray.push(recipe);
                            }
                        }

                        for(const ustensil of recipe.ustensils){
                            let recipeUst = Utils.normalizeText(ustensil);   
                            if(recipeUst.includes(tagText)){
                                recipesMatchedTagArray.push(recipe);
                            }                  
                        }

                    }
                }
                                
                i++;
                
                // htmlRender.updateTagList(recipesMatchedTagArray, typeTag);

            }else{
                if(recipesMatchedTagArray.length != 0){
                    // console.log('JE suis ici')
                    for(const recipeFiltered of recipesMatchedTagArray){
                        let recipeName = Utils.normalizeText(recipeFiltered.name);
                        let recipeDescription = Utils.normalizeText(recipeFiltered.description);   
                        let searchNotEnd = true;
                        
    
                        if(recipeName.includes(tagText) || recipeDescription.includes(tagText)) {
                            recipesMatchedTagArray2.push(recipeFiltered);
                            searchNotEnd = false;
                        }
    
                        if(searchNotEnd){
                            for(const ingredient of recipeFiltered.ingredients){
                                let recipeIng = Utils.normalizeText(ingredient.ingredient);
                                if(recipeIng.includes(tagText)){
                                    recipesMatchedTagArray2.push(recipeFiltered);
                                }
                            }
    
                            for(const ustensil of recipeFiltered.ustensils){
                                let recipeUst = Utils.normalizeText(ustensil);   
                                if(recipeUst.includes(tagText)){
                                    recipesMatchedTagArray2.push(recipeFiltered);
                                }                  
                            }
                        }
                    }
                }
                recipesMatchedTagArray = recipesMatchedTagArray2;
                recipesMatchedTagArray2 = [];
            }
        }

        Utils.clearRecipesSection();
        this.initSearchTag(recipesMatchedTagArray, typeTag, event);

        return{
            'recipesMatchedTagArray' : recipesMatchedTagArray
        }
    }

    static initSearch(result) {
        htmlRender.buildRecipes(result.recipesMatchedArray);
        MessageAlert.buildResultMessageWithResult(result.recipesMatchedArray);
    }

    static initSearchTag(recipesMatchedTagArray, typeTag){
        console.log(recipesMatchedTagArray)
        htmlRender.buildRecipes(recipesMatchedTagArray);
        htmlRender.updateTagList(recipesMatchedTagArray, typeTag, event);
        MessageAlert.buildResultMessageWithResult(recipesMatchedTagArray);
    }
}