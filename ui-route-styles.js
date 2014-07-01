/**
 * @author Manuel Mazzuola
 * https://github.com/manuelmazzuola/angular-route-styles
 * Inspired by https://github.com/tennisgent/angular-route-styles
*/

'use strict';
angular
  .module('uiRouteStyles', ['ui.router'])
  .directive('head', ['$rootScope', '$compile',
    function($rootScope, $compile) {
      return {
        restrict: 'E',
        link: function(scope, elem){
          var html = '<link rel="stylesheet" ng-repeat="css in routeStyles" ng-href="{{css}}" >';
          elem.append($compile(html)(scope));
          scope.routeStyles = [];
          $rootScope.$on('$stateChangeStart', function (evt, toState) {
            scope.routeStyles = [];
            if(toState && toState.data && toState.data.css) {
              if(!Array.isArray(toState.data.css)) {
                toState.data.css = [toState.data.css];
              }
              angular.forEach(toState.data.css, function(css) {
                scope.routeStyles.push(css);
              });
            }
          });
        }
      };
    }
  ]);
