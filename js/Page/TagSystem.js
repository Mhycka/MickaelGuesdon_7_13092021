import htmlRender from './HtmlRender.js';
import Search from '../SearchSystem/search.js';
import Utils from '../UtilsElt/UtilsBase.js';
import MessageAlert from './Message.js';

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
    
        htmlRender.buildBlocKTags(this.tabAllTags, this.typeTag);
        Search.searchBuilderFilterInput(this.typeTag);

        this.filterTags();
    }

    initIngredient(){
        this.recipesOriginData.forEach(ings =>{
            ings.ingredients.forEach( ing  =>{
                let elt=ing.ingredient
                elt=elt.toLowerCase()
                this.tabAllTags.push(elt)
            })
        })
        this.tabAllTags = new Set(this.tabAllTags); 
    }

    initUstensil(){
        this.recipesOriginData.forEach(ings =>{
            ings.ustensils.forEach( ing  =>{
                let elt=ing
                elt=elt.toLowerCase()
                this.tabAllTags.push(elt)
            })
        })
        this.tabAllTags = new Set(this.tabAllTags);
    }
    
    initAppliance(){
        this.recipesOriginData.forEach(elt =>{
            let elt2=elt.appliance
            elt2=elt2.toLowerCase()
            this.tabAllTags.push(elt2)
        })
        this.tabAllTags = new Set(this.tabAllTags);
    }

    filterTags(){
        let tags = document.querySelector("#" + this.typeTag + 'Example');
        let tagsList = tags.querySelectorAll("li");
        let launchBtn = document.getElementById(this.typeTag + 'Elt').childNodes[0];
        let openBtn = document.getElementById(this.typeTag + 'OpenFilter');
        let hideBtn = document.getElementById (this.typeTag + 'Hide');

        tagsList.forEach( tag =>{
            tag.addEventListener('click', (event) => {
                this.tabTagsSelected.push(event.target.textContent);
                tag.style.display="none";
                this.eventTags(event.target.textContent, tag, event.target);
                Utils.hideButtonsOnClick(launchBtn, openBtn, hideBtn);
            })
        })
    }

    eventTags(tagText, tag, event) {
        let elementTag = document.getElementById('tagsBadges');
        this.pushDownButtonsFilter();
        this.renderTag(elementTag, tagText, tag);
        Search.builderSearchTag(this.typeTag, event);

        return this;
    }

    renderTag(elt, tagText,tag) {
        elt.innerHTML += `<div class="${this.typeTag}Tag" id="closeIcon"><span>${tagText}</span><i class="far fa-times-circle ${this.typeTag}CloseIcon"></i></div>`;

        this.hideTag(tag);
    }

    pushDownButtonsFilter() {
        document.getElementById(this.typeTag + 'Hide').style.top = '0rem';
    }

    hideTag(tag) {
        let closeIcon = document.querySelectorAll('#' + 'closeIcon');
        let i = closeIcon.length;
        
        for (const close of closeIcon) {
            close.addEventListener('click', () =>{
                this.pushUpButtonsFilter();
                close.remove();
                tag.style.display="initial";
                htmlRender.buildRecipes(this.recipesOriginData);
                MessageAlert.buildResultMessageWithResult(this.recipesOriginData);
                i--;

                if(i === 0 ){
                    window.location.reload(false);
                }
            })
        }
    }


    pushUpButtonsFilter() {
        document.getElementById(this.typeTag + 'Hide').style.top = '0rem';
    }
}