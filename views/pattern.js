
App.PatternView = Ember.View.extend({
  didInsertElement: function() {
    Ember.run.schedule('afterRender', this, function() {
      this.$('.js-scrollspy').scrollSpy();
    })
  }
});