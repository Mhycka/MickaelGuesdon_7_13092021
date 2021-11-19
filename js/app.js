import tags from './Page/TagSystem.js';
import Search from './SearchSystem/search.js'
import htmlRender from './Page/HtmlRender.js'

let ingredient = new tags('ingredient', recipesData);
let ustensil = new tags('ustensil', recipesData);
let appliance = new tags('appliance', recipesData);

// window.onload = function() {
//     let test = '#' + ingredient.typeTag + 'Example > li';
// let elementList = document.querySelectorAll(test);
// console.log(elementList , test)
// console.log(ingredient.typeTag)
// }


// sectionRecipesCard.render(ingredient, ustensil, appliance)
// ingredient(sectionRecipesCard.render(ingredient))
// // ingredient.filterTags()

// ustensil.afficher()
// // ustensil.filterTags()

// appliance.afficher()
// // filterTags.filterTags()
Search.searchBuilder();