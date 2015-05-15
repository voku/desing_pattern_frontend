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

// TODO: move this code into ember.js
$(document).ready(function () {
  $(".js-button-collapse").sideNav();
});

