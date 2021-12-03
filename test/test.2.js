
function searchMainInput(value) {
    let recipesMatchedArray = [];
   recipesData.forEach(recipe => {
        if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) || Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) || recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
            recipesMatchedArray.push(recipe);
        }
    })
    return {
        'recipesMatchedArray': recipesMatchedArray
    };                  
}