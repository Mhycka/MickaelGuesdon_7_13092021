// import builder from './Page/builder.js';
// import button from './page/button.js';
import MessageAlert from './Page/Message.js';
import Search from './SearchSystem/search.js';
import Utils from './UtilsElt/UtilsBase.js';

// Build by default
// builder.init();

// Build with search
// document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
//     let valueSearch = key.target.value;
//     if (Utils.isValid(valueSearch)) {
//         let result = Search.searchMainInput(valueSearch);
//         if (result.recipesMatchedArray.length === 0) {
//             return MessageAlert.buildResultMessageWithNoResult();
//         }
//         Utils.clearRecipesSection();
//         // builder.initSearch(result);
//         return;
//     }
//     // Reset Build system
//     Utils.clearRecipesSection();
//     // builder.init();
// });

class tags{
    constructor(typeTag){
        this.typeTag = typeTag;
        this.tabAllTags = [];
        this.tabTagsSelected = [] ;
        this.init();
        // console.log(typeTag)
    }

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
        this.render();
        this.filterTags();
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

    render(){
        let filter =document.getElementById('filter');
        let eltdiv = document.createElement('div');
        eltdiv.setAttribute('id', this.typeTag +'Elt');
        filter.appendChild(eltdiv);
        
        let createBtn = document.getElementById(this.typeTag + 'Elt');
        let eltBtn = document.createElement('button');
        eltBtn.innerHTML= this.typeTag+ 's';
        createBtn.appendChild(eltBtn);


        let chevronOpen = document.createElement('i');
        chevronOpen.setAttribute('class', 'fas fa-chevron-down');
        chevronOpen.setAttribute('id', this.typeTag + 'OpenFilter');
        eltBtn.appendChild(chevronOpen);

        let eltdivHide = document.createElement('div');
        eltdivHide.setAttribute('id', this.typeTag + 'Hide');
        createBtn.appendChild(eltdivHide);

        let createInput = document.getElementById(this.typeTag + 'Hide');
        let eltLabel = document.createElement('label');
        let eltInput = document.createElement('input');
        let chevronClose = document.createElement('i');
        let eltdiv2 = document.createElement('div');
        eltLabel.setAttribute('for', this.typeTag + 'Input');
        eltInput.setAttribute('type', 'search');
        eltInput.setAttribute( 'id', this.typeTag + 'Input');
        eltInput.setAttribute('aria-label', 'Search through ' + this.typeTag);
        eltInput.setAttribute('placeholder', 'Search a ' + this.typeTag);
        chevronClose.setAttribute('class', 'fas fa-chevron-up');
        chevronClose.setAttribute('id', this.typeTag + 'CloseFilter');
        createInput.appendChild(eltLabel);
        createInput.appendChild(eltInput);
        createInput.appendChild(chevronClose);
        createInput.appendChild(eltdiv2);

        // let liste = document.getElementById(this.typeTag + 'Example');
        let eltul = document.createElement('ul');
        eltul.setAttribute('id', this.typeTag + 'Example');
        eltdiv2.appendChild(eltul);
        // eltul.appendChild(liste);
 
        for(let tag of this.tabAllTags){
            let eltli=document.createElement('li');
            eltul.appendChild(eltli);
            eltli.innerHTML = tag;
        }
        this.afficher();
    }

    afficher(){
        let launchBtn = document.getElementById(this.typeTag + 'Elt').childNodes[0];
        let openBtn = document.getElementById(this.typeTag + 'OpenFilter');
        let closeBtn = document.getElementById(this.typeTag + 'CloseFilter');
        let hideBtn = document.getElementById (this.typeTag + 'Hide')

        launchBtn.addEventListener('click', () => {
            this.displayBtn(launchBtn);
            this.hideArrow(hideBtn);
            this.displayHidden(hideBtn);
        })

        closeBtn.addEventListener('click', () => {
            this.hideButtonsOnClick(launchBtn, openBtn, hideBtn);
        })
    }

    hideButtonsOnClick(btn, open, hide) {
        this.hideBtn(btn);
        this.displayArrow(open);
        this.hideHidden(hide);
    }

    displayBtn(btn){
        if(screen.width <= 576) {
            btn.style.width = "11rem";
        } else {
            return btn.style.width = "35rem";
        }
    }

    hideBtn(btn) {
        return btn.style.width = "11rem";
    }

    displayArrow(open) {
        return open.style.display = 'block';
    }

    hideArrow(open){
        return open.style.display = 'none';
    }

    displayHidden(hide){
        return hide.style.display = 'block';
    }

    hideHidden(hide) {
        return hide.style.display = 'none';
    }

    filterTags(tagName){
        let AppliancesTag = document.getElementById('tagsBadges');

        document.getElementById(this.typeTag + 'Example').addEventListener('click', (event) => {
            console.log(event)

        })

       this.tabTagsSelected.push(tagName)
    }
}


let ingredient = new tags('ingredient');
let ustensil = new tags('ustensil');
let appliance = new tags('appliance');

ingredient.afficher()
// ingredient.filterTags()

ustensil.afficher()
// ustensil.filterTags()

appliance.afficher()
// filterTags.filterTags()
// Search.searcheTags(ustensil.affiche() , ingredient.affiche())

// let ingredeint = new Accesoice("ingrediet" , recipe)
// let applience = new Accesoice("applience" , recipe)
// let ingredeint = new Accesoice("ingrediet" , recipe)