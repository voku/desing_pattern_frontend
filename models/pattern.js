
App.Pattern = Ember.Object.extend({

});

App.Pattern.reopenClass({
  all: function(pattern_name) {
    return $.getJSON("json/pattern.json").then(function(response) {

      // DEBUG
      //console.log('json.pattern ->');
      //console.log(response);
      //
      //console.log('router.pattern_name ->');
      //console.log(pattern_name);

      var propertyNames = '';
      var language = 'de';
      var items = [];
      response.patterns.forEach( function (pattern) {

        if (
          !pattern_name
          ||
          (pattern_name && pattern.shortcut == pattern_name)
        ) {

          pattern.languages.forEach(function (languageKey) {
            if (language === Object.getOwnPropertyNames(languageKey).toString()) {
              pattern.currentLang = languageKey[language][0];
              return false;
            }
          });
          items.push( App.Pattern.create(pattern) );

        }
      });
      return items;
    });
  }
});