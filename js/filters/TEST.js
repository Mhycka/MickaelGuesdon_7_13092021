
// Au click sur un ingredient
//     Créer element HTML 
//     Push ail dans tableau ingradien



// let ingredients = ["Lait de coco" , "Crème de coco"];
// let appliances = [];
// let Ustensils = [];

// SETUP filtrer (View)
// FONCTION FILTER (Fonctionnel)


// ["ingredients" ,"appliances" , "Ustensils"]
// boucle (ITEM)
//     Elt+ITEM = Eltingredients

//     Bocule des recipe
//         if ingredietn
//             //

//         if aplience



// //Boucle
// All recipe

// Return newrecipe = filtrer : ingredients
// let newRecipes = recipe
//     Boucle recettes (RECIPE , index)
//         return tableua = boucle ingredient
//         let teb = ["Lait de coco" , "Crème de coco" , "Sucre" , "Jus de citron"];
//         Boucle sur notre tableau ingredine de tag (TAG)
//             if(!teb.includes(TAG)){
//                 Supp Recip unset(newRecipes[index])
//             }

       
// Return newrecipe = filtrer : appliances
// Return newrecipe = filtrer : Ustensils
//     boucler sur tableau

// Return toutes nos recettes good 

import Utils from '../UtilsElt/UtilsBase.js';
import button from '../page/button.js';


 export default class BuilderRecipes {

    static tabRecipesRefresh = recipesData;
    static tabR=this.tabRecipesRefresh;
    static ingredientsEx = document.getElementById('ingredientsExample');

    static displayTags(arraySort,cible,type){
        console.log(cible)

        document.getElementById(cible).innerHTML=``;

        for(let element of arraySort){
            let elt=document.createElement('li')
            elt.setAttribute('class','elementListe')
            elt.classList.add("elementListe"+type)
            elt.innerHTML=`<p>${element}</p>`;
            document.getElementById(cible).appendChild(elt)
        }

        Utils.clearFilters(this.ingredientsEx);
        button.launchButtons(document.querySelector("#ingredientsElt > button"),
            document.querySelector("#openIngredientsFilter"),
            document.querySelector("#closeIngredientsFilter"),
            document.querySelector("#ingredientsHide"));
    }
   

    static actualisationStartSug(){
        this.displayTagsStartsIng(this.tabR)
        // displayTagsStartsUst(tabR)
        // displayTagsStartsApp(tabR)
        // this.displayTags(this.tabR)
    }

    static tabIng=[];
    static tabApp=[];
    static tabUst=[];

    static displayTagsStartsIng(array){
        this.tabIng=[]
        document.getElementById('ingredientsExample').innerHTML=` `;
        for(let ings of array){
            for(let ing of ings.ingredients){
                let elt=ing.ingredient
                elt=elt.toLowerCase()
                this.tabIng.push(elt)
            }
        }
        this.tabIng= new Set(this.tabIng);
        this.displayTags(this.tabIng,'ingredientsExample','inputIngredients')
        this.clickChoix('inputIngredients',array)
    }


    static clickChoix(type){
        let choix = document.getElementsByClassName("elementListe"+type);
        //ecoute des evenements des mots dans la liste de sugestion
        for(var i=0; i<choix.length;){
            let index= choix[i].innerHTML
            index=index.slice(3,-4)
            choix[i].addEventListener('click',()=>callbackClickIng(index,type));
            i++
        }
        function callbackClickIng(index,type){
            new vignetteChoix(index,type)
            rechIngt(index)
        }
        var tabIngs=[]
        function rechIngt(nom){
            for(let ing of tabR ){
                for(let ingg of ing.ingredients){
                    let inggg=ingg.ingredient
                    inggg=inggg.toLowerCase()
                    if(inggg==nom){
                        tabIngs.push(ing) 
                    }
                }
            }
            tabR=tabIngs
            new recetteDisplay(tabR,tabRecActu)
            
            actualisationStartSug()
        }
    }
    
    // static displayTags(array){
    //     this.tabIng=[]
    //     this.tabApp=[]
    //     this.tabUst =[]
    //     document.getElementById('ingredientsExample').innerHTML=` `;
    //     for(const ings of array){
    //         for(const ing of ings.ingredients){
    //             let elt=ing.ingredient
    //             elt=elt.toLowerCase()
    //             this.tabIng.push(elt)
    //         }
    //     }
    //     this.tabIng= new Set(this.tabIng);
    //     this.displayTags(this.tabIng,'ingredientsExample','inputIngredients')
    //     this.clickChoix('inputIngredients',array)
        

    //     document.getElementById('appliancesExample').innerHTML=` `;
    //     for(let elt of array){
    //         let elt2=elt.appliance
    //         elt2=elt2.toLowerCase()
    //         this.tabApp.push(elt2)
    //     }
    //     this.tabApp= new Set(this.tabApp);
    //     this.displayTags(tabApp,'appliancesExample','inputAppliances')
    //     clickChoixApp('inputAppliances',array)

    //     document.getElementById('ustensilesExample').innerHTML=` `;
    //     for(let ings of array){
    //         for(let ing of ings.ustensils){
    //             let elt=ing
    //             elt=elt.toLowerCase()
    //             this.tabUst.push(elt)
    //         }
    //     }
    //     this.tabUst= new Set(this.tabUst);
    //     this.displayTags(this.tabUst,'ustensilesExample','inputUstensiles')
    //     clickChoixUst('inputUstensiles',array)
    // }

    // static clickChoix(type){
    //     let choix = document.getElementsByClassName("elementListe"+type);
    //     //ecoute des evenements des mots dans la liste de sugestion
    //     for(var i=0; i<choix.length;){
    //         let index= choix[i].innerHTML
    //         index=index.slice(3,-4)
    //         choix[i].addEventListener('click',()=>callbackClickIng(index,type));
    //         i++
    //     }
    //     function callbackClickIng(index,type){
    //         new vignetteChoix(index,type)
    //         rechIngt(index)
    //     }
    //     var tabIngs=[]
    //     function rechIngt(nom){
    //         for(let ing of tabR ){
    //             for(let ingg of ing.ingredients){
    //                 let inggg=ingg.ingredient
    //                 inggg=inggg.toLowerCase()
    //                 if(inggg==nom){
    //                     tabIngs.push(ing) 
    //                 }
    //             }
    //         }
    //         this.tabR=tabIngs
    //         new recetteDisplay(tabR,tabRecActu)
            
    //         actualisationStartSug()
    //     }
    // }
}