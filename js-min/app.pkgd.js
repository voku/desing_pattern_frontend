/*
 * Curcooma by Lars Moelleken (https://www.moelleken.org))
 */

window.App=Ember.Application.create({LOG_TRANSITIONS:!0}),Ember.Router.extend({rootURL:"/"}),App.Router.map(function(){this.resource("patterns"),this.resource("pattern",{path:"/pattern/:pattern_name"})}),App.ApplicationRoute=Ember.Route.extend({model:function(){return App.Pattern.all()}}),App.PatternRoute=Ember.Route.extend({model:function(a){return App.Pattern.all(a.pattern_name)}}),App.ApplicationController=Ember.Controller.extend({}),App.PatternController=Ember.Controller.extend({}),App.Pattern=Ember.Object.extend({}),App.Pattern.reopenClass({all:function(a){return $.getJSON("json/pattern.json").then(function(b){var c="de",d=[];return b.patterns.forEach(function(b){(!a||a&&b.shortcut==a)&&(b.languages.forEach(function(a){return c===Object.getOwnPropertyNames(a).toString()?(b.currentLang=a[c][0],!1):void 0}),d.push(App.Pattern.create(b)))}),d})}});
//# sourceMappingURL=app.pkgd.js.map