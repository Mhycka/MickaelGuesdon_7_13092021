// import builder from './Page/builder.js';
import MessageAlert from './Page/Message.js';
import Search from './SearchSystem/search.js';
import Utils from './UtilsElt/UtilsBase.js';

// Build by default
// builder.init();

// Build with search
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    if (Utils.isValid(valueSearch)) {
        let result = Search.searchMainInput(valueSearch);
        if (result.recipesMatchedArray.length === 0) {
            return MessageAlert.buildResultMessageWithNoResult();
        }
        Utils.clearRecipesSection();
        // builder.initSearch(result);
        return;
    }
    // Reset Build system
    Utils.clearRecipesSection();
    // builder.init();
});

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
            // console.log(this.typeTag);

        }else if(this.typeTag == "appliance"){
            // console.log(this.typeTag +'Elt');
        }
        this.render();
    }

    initIngredient(recipes){
        console.log(recipes)
            //crat tableu
            if(!this.tabAllTags.includes()){
                //push
                //Supprimer double automatique
            }   
    }
    

    render(){
        //Let qui contienet tout les li
        // let elm = ''
        // this.tabAllTag.forEach(tag => {
        //     elm += "<Li class="tag">tag<li>"
        // });
        //Rendre le html (Generale + ${elm})

    }

    affiche(){
        console.log(this.tabTagsSelected);
    }

    Clic(tagName){
       this.tabTagsSelected.push(tagName)
    }
}


let ingredient = new tags('ingredient');
let ustensil = new tags('ustensil');
let appliance = new tags('appliance');
// let meuble = new tags('meuble');


ingredient.Clic('Thomas')
ingredient.affiche()

ustensil.Clic('couteau')
ustensil.affiche()

appliance.Clic('cocotte')
appliance.affiche()
// Search.searcheTags(ustensil.affiche() , ingredient.affiche())

// let ingredeint = new Accesoice("ingrediet" , recipe)
// let applience = new Accesoice("applience" , recipe)
// let ingredeint = new Accesoice("ingrediet" , recipe)