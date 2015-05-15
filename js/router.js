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
