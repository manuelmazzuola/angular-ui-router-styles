angular-ui-router-styles
====================

[![Build Status](https://travis-ci.org/manuelmazzuola/angular-ui-router-styles.svg)](https://travis-ci.org/manuelmazzuola/angular-ui-router-styles)

This is a simple module for AngularJS that provides the ability to have route-specific CSS stylesheets, by integrating with Angular [uiRouter](https://github.com/angular-ui/ui-router).

What does it do?
---------------

It allows you to declare partial-specific or route-specific styles for your app using
Angular's ui-router `$stateProvider` service. This solves that problem by allowing you to do something like this:

```javascript
app.config(['$stateProvider', function($stateProvider){
    $stateProvider

      .state('state1', {
        url: '/state1',
        controller: 'State1controller',
        template: '<div ui-view></div>',
        data: {
          css: 'styles/custom-state1-override.css'
        }
      })

      .state('state1.state12', {
        url: '/:id',
        controller: 'State12Controller',
        templateUrl: 'views/my-template.html'
      })

      .state('state2', {
        url: '/state2',
        controller: 'State2Controller',
        templateUrl: 'views/another-template.html',
        data: {
          css: ['styles/custom-state2-override.css', 'another.css']
        }
      })
        // more states can be declared here
}]);
```

Note that `state1.state12` will have the parent file `styles/custom-state1-override.css` injected; redefine the css array for override it.

How to install:
---------------

 * Install it with Bower via `bower install angular-ui-router-styles --save`

 * Ensure that your application module specifies `uiRouterStyles` as a dependency: `angular.module('myApplication', ['uiRouterStyles'])`

 * Add css file(s) relative path to the state data object
```javascript
.state('state1', {
  url: '/state',
  controller: 'StateCtrl',
  templateUrl: 'views/my-template.html',
  data: {
    css: 'styles/some-overrides.css'
  }
})
```

**Things to notice:**
* Specifying a css property on the route is completely optional. If the state doesn't have a css property, the service will simply do nothing for that route.
* You can even have multiple page-specific stylesheets per state, where the css property is an **array** of relative paths to the stylesheets needed for that route.
* If a parent state exists the data object is inherited.


This directive does the following things:

* It compiles (using `$compile`) an html string that creates a set of <link /> tags for every item in the `data.css` state property using `ng-repeat` and `ng-href`.
* It appends that compiled set of `<link />` elements to the `<head>` tag.
* It then uses the `$rootScope` to listen for `'$stateChangeSuccess'` events. For every `'$stateChangeSuccess'` event, it cleans all css appended before and adds the new css file(s) to the `<head>` tag if there are any.
