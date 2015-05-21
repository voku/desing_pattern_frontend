
App.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    Ember.run.schedule('afterRender', this, function() {
      this.$(".js-button-collapse").sideNav();
    })
  }
});