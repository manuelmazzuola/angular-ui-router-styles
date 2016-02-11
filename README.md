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
          css: [
            'styles/custom-state1.css',
            {
              name: 'layout',
              href: 'styles/state1-layout.css'
            }
          ]
        }
      })

      .state('state1.state12', {
        url: '/:id',
        controller: 'State12Controller',
        templateUrl: 'views/my-template.html',
        data: {
          css: [
            'styles/custom-state1.state12.css',
            {
              name: 'layout',
              href: 'styles/state1.state12-layout.css'
            }
          ]
        }
      })

      .state('state2', {
        url: '/state2',
        controller: 'State2Controller',
        templateUrl: 'views/another-template.html',
        data: {
          css: ['styles/custom-state2.css', 'styles/another.css']
        }
      })

      .state('state3', {
        url: '/state3',
        controller: 'State3Controller',
        templateUrl: 'views/another-super-template.html',
        data: {
          css: 'styles/custom-state3.css'
        }
      })
        // more states can be declared here
}]);
```

* For state1 state we will have CSS: ['styles/custom-state1.css', 'styles/state1-layout.css'].
* For state1.state2 state we will have CSS: ['styles/custom-state1.css', 'styles/custom-state1.state12.css', 'styles/state1.state12-layout.css'].
* For state2 state we will have CSS: ['styles/custom-state2.css', 'styles/another.css'].
* For state3 state we will have CSS: ['styles/custom-state3.css'].


How to install:
---------------

 * Install it with Bower via `bower install angular-ui-router-styles --save`

 * Ensure that your application module specifies `uiRouterStyles` as a dependency: `angular.module('myApplication', ['uiRouterStyles'])`

 * Add the directive `ui-router-styles` to your body tag or wherever you want
 ```
 <html>
   <head>
    <body ng-app="myApp" ui-router-styles>
   </head>
 </html>
 ```

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

A simple plunkr to understand the usage: http://plnkr.co/edit/HIcYEj2QRqBCwbZCU0Il?p=preview

**Things to notice:**
* Specifying a css property on the route is completely optional. If the state doesn't have a css property, the service will simply do nothing for that route.
* You can even have multiple page-specific stylesheets per state, where the css property is an **array** of relative paths or objects contains the name and href attributes.
* If a parent state exists the data object is inherited.


This directive does the following things:

* It compiles (using `$compile`) an html string that creates a set of <link /> tags for every item in the `data.css` state property using `ng-repeat` and `ng-href`.
* It appends that compiled set of `<link />` elements to the `<head>` tag.
* It then uses the `$rootScope` to listen for `'$stateChangeSuccess'` events. For every `'$stateChangeSuccess'` event, it cleans all css appended before and adds the new css file(s) to the `<head>` tag if there are any.
