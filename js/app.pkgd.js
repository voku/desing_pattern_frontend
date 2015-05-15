/**
 * App scripts
 *
 * @desc Scripts to run the frotend
 * @author [@voku]
 * @dependency ember.js
 */

// first things first: let's instantiate our app
window.App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

;
/**
 * Router scripts
 *
 * @desc Scripts to route the frotend
 * @author [@voku]
 * @dependency ember.js
 */

Ember.Router.extend({
  rootURL: '/'
});

App.Router.map(function () {
  this.resource('patterns');
  this.resource('pattern', { path: '/pattern/:pattern_name' });
});
;

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Pattern.all();
  }
});
;

App.PatternRoute = Ember.Route.extend({
  model: function(params) {
    return App.Pattern.all(params.pattern_name);
  }
});;

App.ApplicationController = Ember.Controller.extend({

});;

App.PatternController = Ember.Controller.extend({
  /*
  queryParams: ["pattern_name"],
  pattern_name: null,
  getPatternName: function() {
    return this.get('pattern_name');
  }.property('pattern_name')
  */
});;

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
//# sourceMappingURL=app.pkgd.js.map