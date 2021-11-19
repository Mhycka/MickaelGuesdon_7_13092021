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
                // console.log(valueSearch, valueSearch.length)

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

    //Filter les recipes par rapport au tag -> rebuild html


    // static builderSearchTag(elt, tag, recipes, typeTag, tagselected) {

    //     for( const tagValue of tagselected) {      
    //         if (tagValue.includes(tag)) {
    //             // console.log('ok')
                
    //             //Focntion test()
    //             let result = this.searchFilterTag(tag, tagselected);
                
    //             if (result.recipesMatchedTagArray.length === 0) {
    //                 return MessageAlert.buildResultMessageWithNoResult();
    //             }
    //             Utils.clearRecipesSection();
    //             this.initSearchTag(result);
    //             return;
    //          }  else if (tagselected.length <= 0) {
    //             MessageAlert.hideMessage();
    //             sectionRecipesCard.buildResult(recipes);
    //             return;
                
    //          }
    //         //Reset Build system
    //         Utils.clearRecipesSection();
    //     }
    // }

 
    
        //Chercher tout nos filtres dans le HTML
        //Créer un tableau de donnée (Foreach)
        //Foreach
            //push Tag dans un tableau

        //SearhFilter(Tag)

        //Message d'erreur

    static builderSearchTag(typeTag){
        let tagData = [];
        let tags = document.querySelectorAll('.'+ typeTag +'Tag');

        for(const tag of tags){
            tagData.push(tag);
            this.searchFilterTag(tagData);
        }

        if (tagData.length === 0) {
            return MessageAlert.buildResultMessageWithNoResult();
        }
    }

    static searchFilterTag(tags){
        let recipesMatchedTagArray = [];
        let recipesMatchedTagArray2 = [];
        let i = 0;

        for(const tag of tags){
            let tagText = Utils.normalizeText(tag.textContent);

            if( i == 0){
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

                    }
                }                
                i++;
                Utils.clearRecipesSection();
                this.initSearchTag(recipesMatchedTagArray);

            }else{
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
                    }
                }
                recipesMatchedTagArray = recipesMatchedTagArray2;
                Utils.clearRecipesSection();
                this.initSearchTag(recipesMatchedTagArray);
            }
        }

        return{
            'recipesMatchedTagArray' : recipesMatchedTagArray
        }
    }

    static initSearch(result) {
        htmlRender.buildRecipes(result.recipesMatchedArray);
        MessageAlert.buildResultMessageWithResult(result.recipesMatchedArray);
    }

    static initSearchTag(recipesMatchedTagArray){
        htmlRender.buildRecipes(recipesMatchedTagArray);
        MessageAlert.buildResultMessageWithResult(recipesMatchedTagArray);
    }
}