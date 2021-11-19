
import htmlRender from './HtmlRender.js';
import MessageAlert from './Message.js';
import Utils from '../UtilsElt/UtilsBase.js';
import Logic from '../UtilsElt/Logic.js';
import Search from '../SearchSystem/search.js';

 export default class tags{

    constructor(typeTag , recipes){
        this.typeTag = typeTag;
        this.tabAllTags = [];
        this.tabTagsSelected = [] ;
        this.recipesOriginData = recipes;
        this.init();
    }

 // Sort initialization for each category  
    init(){
        //Create an Array of element
        if( this.typeTag == "ingredient"){
            this.initIngredient()

        }else if(this.typeTag == "ustensil"){
            this.initUstensil()

        }else if(this.typeTag == "appliance"){
            this.initAppliance()
        }
    
        htmlRender.buildRecipes(this.recipesOriginData);
        htmlRender.buildBlocKTags(this.tabAllTags, this.typeTag);

        // document.getElementById(this.typeTag + 'Example').addEventListener('click', (event) => { 
        //      this.filterTags(event) 
        // })
        
        this.filterTags();
    }

    initIngredient(){
        for(let ings of this.recipesOriginData){
            for(let ing of ings.ingredients){
                let elt=ing.ingredient
                elt=elt.toLowerCase()
                this.tabAllTags.push(elt)
            }
        }
        this.tabAllTags = new Set(this.tabAllTags); 
    }

    initUstensil(){
        for(let ings of this.recipesOriginData){
            for(let ing of ings.ustensils){
                let elt=ing
                elt=elt.toLowerCase()
                this.tabAllTags.push(elt)
            }
        }
        this.tabAllTags = new Set(this.tabAllTags);
    }
    
    initAppliance(){
        for(let elt of this.recipesOriginData){
            let elt2=elt.appliance
            elt2=elt2.toLowerCase()
            this.tabAllTags.push(elt2)
        }
        this.tabAllTags = new Set(this.tabAllTags);
    }

    filterTags(){
        let container = document.querySelector("#" + this.typeTag + 'Example');
        let tagsList = container.querySelectorAll("li");

        for (const tag of tagsList) {
            tag.addEventListener('click', (event) => {
                this.tabTagsSelected.push(event.target.textContent);
                this.eventTags(event.target.textContent);
                console.log(this.tabAllTags)
                this.tabAllTags.splice(tag);
            })
        }
       
    }

    eventTags(tag) {
        let elementTag = document.getElementById('tagsBadges');
        this.pushDownButtonsFilter();
        this.renderTag(elementTag, tag);
        Search.builderSearchTag(this.typeTag);

        return this;
    }

    renderTag(elt, tag) {
        elt.innerHTML += `<div class="${this.typeTag}Tag" id="closeIcon"><span>${tag}</span><i class="far fa-times-circle ${this.typeTag}CloseIcon"></i></div>`;

        this.hideTag();
    }

    pushDownButtonsFilter() {
        document.getElementById(this.typeTag + 'Hide').style.top = '0rem';
    }

    hideTag() {
        let closeIcon = document.querySelectorAll('#' + 'closeIcon');

        for (const close of closeIcon) {
            close.addEventListener('click', () =>{
                this.pushUpButtonsFilter();
                close.remove();
            })
        }
    }

    pushUpButtonsFilter() {
        document.getElementById(this.typeTag + 'Hide').style.top = '0rem';
    }

    // removeTagsOnClick(event, elementTag, recipes) {
    //     console.log(event, elementTag, recipes)
    //     let tagToClose = document.querySelectorAll('.' + this.typeTag + 'Tag');
    //     console.log(tagToClose)
    //     tagToClose.forEach((tag) => {
    //         tag.addEventListener('click', () => {
    //             this.resetSection(event, elementTag, recipes);
    //         })
    //     })
    // }

    resetSection(elt, tag, recipes) {
        // this.hideTag(elt, tag, recipes);
        MessageAlert.buildResultMessageWithResult(recipes);
        // Utils.clearRecipesSection();
        // sectionRecipesCard.buildResult(recipes);
        // Utils.clearFilters(document.getElementById(this.typeTag+ 'Example'));
        // sectionRecipesCard.render(init(recipes));
    }
}