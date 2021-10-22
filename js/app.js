// import builder from './Page/builder.js';
import button from './page/button.js';
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
        let liste = document.getElementById(this.typeTag + 'Example'); 
        for(let tag of this.tabAllTags){
            let eltli=document.createElement('li');
            liste.appendChild(eltli);

            eltli.innerHTML = tag;
        }
        
        this.afficher();
    }

    afficher(){
        // console.log(this.typeTag);
        let launchBtn = document.getElementById(this.typeTag + 'Elt').childNodes[1];
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

    //    this.tabTagsSelected.push(tagName)
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