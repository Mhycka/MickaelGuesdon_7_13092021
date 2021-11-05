
import sectionRecipesCard from './HtmlRender.js';

 export default class tags{

    constructor(typeTag){
        this.typeTag = typeTag;
        this.tabAllTags = [];
        this.tabTagsSelected = [] ;
        this.init();
    }

 // Sort initialization for each category  
    init(){
        var recipes = recipesData;
        //Créer mon tableeau d'élement
        if( this.typeTag == "ingredient"){
            this.initIngredient(recipes)

        }else if(this.typeTag == "ustensil"){
            this.initUstensil(recipes)

        }else if(this.typeTag == "appliance"){
            this.initAppliance(recipes)
        }
    
        sectionRecipesCard.buildResult(recipesData);
        sectionRecipesCard.render(this.tabAllTags, this.typeTag);
        // this.filterTags(recipes);
        document.getElementById(this.typeTag + 'Example').addEventListener('click', (event) => { 
            this.filterTags(this.tabAllTags, event) })
    }

    initIngredient(recipes){
        for(let ings of recipes){
            for(let ing of ings.ingredients){
                let elt=ing.ingredient
                elt=elt.toLowerCase()
                this.tabAllTags.push(elt)
            }
        }
        this.tabAllTags = new Set(this.tabAllTags); 
    }

    initUstensil(recipes){
        for(let ings of recipes){
            for(let ing of ings.ustensils){
                let elt=ing
                elt=elt.toLowerCase()
                this.tabAllTags.push(elt)
            }
        }
        this.tabAllTags = new Set(this.tabAllTags);
    }
    
    initAppliance(recipes){
        for(let elt of recipes){
            let elt2=elt.appliance
            elt2=elt2.toLowerCase()
            this.tabAllTags.push(elt2)
        }
        this.tabAllTags = new Set(this.tabAllTags);
    }

    filterTags(allTags, event){
        // console.log(event.path[0])
        let elementTag = document.getElementById('tagsBadges');

        for(const tagName of allTags){
            // console.log(event.target.textContent, tagName)
            if( event.target.textContent === tagName) {
                // console.log(event.target)
                this.tabTagsSelected.push(event.target.textContent)
                console.log(this.tabTagsSelected)

                this.buildTags(elementTag, event.target.textContent)
            }
        }
    }

    buildTags(elt, tag) {
        this.pushDownButtonsFilter();
        // this.displayTag(elt);
        this.renderTag(elt, tag);

        console.log(this.tabTagsSelected)
        //SEARCH TAG
        // sectionRecipesCard.buildRecipe(this.tabTagsSelected)
        return this;
    }

    renderTag(elt, tag) {
        // let elementList = document.querySelectorAll('#' + this.typeTag + 'Example > li');
        // console.log(elementList)
        
        return elt.innerHTML += `<div class="${this.typeTag}Tag" id="tagElt">${tag} <i class="far fa-times-circle" ></i></div>`;
    }

    pushDownButtonsFilter() {
        document.getElementById(this.typeTag + 'Hide').style.top = '0rem';
    }
}