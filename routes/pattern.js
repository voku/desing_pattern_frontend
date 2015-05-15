
App.PatternRoute = Ember.Route.extend({
  model: function(params) {
    return App.Pattern.all(params.pattern_name);
  }
});