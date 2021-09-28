
import builder from './Page/builder';
import Message from './Page/Message';
import Search from './SearchSystem/search';
import Utils from './Utils/UtilsBase';

// Build by default without search
builder.init();

// Build with search Input
document.getElementById('searchBarInput').addEventListener('keyup', (key) => {
    let valueSearch = key.target.value;
    if (Utils.isValid(valueSearch)) {
        let result = Search.searchMainInput(valueSearch);
        if (result.recipesMatched.length === 0) {
            return Message.buildResultMessageWithNoResult();
        }
        Utils.clearRecipesSection();
        builder.initSearch(result);
        return;
    }
    // Reset Build
    Utils.clearRecipesSection();
    builder.init();
});