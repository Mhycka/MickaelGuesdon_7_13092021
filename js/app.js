import tags from './Page/TagSystem.js';
import Search from './SearchSystem/search.js'
import htmlRender from './Page/HtmlRender.js'

htmlRender.buildRecipes(recipesData);

let ingredient = new tags('ingredient', recipesData);
let ustensil = new tags('ustensil', recipesData);
let appliance = new tags('appliance', recipesData);

Search.searchBuilder();