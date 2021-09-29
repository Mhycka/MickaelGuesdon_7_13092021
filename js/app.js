
import builder from './Page/builder.js';
import MessageAlert from './Page/Message.js';
import Search from './SearchSystem/search.js';
import Utils from './UtilsElt/UtilsBase.js';

// Build by default without search
builder.init();

// Build with search Input
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    if (Utils.isValid(valueSearch)) {
        let result = Search.searchMainInput(valueSearch);
        if (result.recipesMatched.length === 0) {
            return MessageAlert.buildResultMessageWithNoResult();
        }
        Utils.clearRecipesSection();
        builder.initSearch(result);
        return;
    }
    // Reset Build
    Utils.clearRecipesSection();
    builder.init();
});