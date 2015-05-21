
App.PatternsView = Ember.View.extend({
  didInsertElement: function() {
    Ember.run.schedule('afterRender', this, function() {
      this.$('#js-pattern-overview .tabs').tabs();
    })
  }
});