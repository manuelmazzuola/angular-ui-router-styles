/**
 * @author Manuel Mazzuola
 * https://github.com/manuelmazzuola/angular-ui-router-styles
 * Inspired by https://github.com/tennisgent/angular-route-styles
 */

'use strict';

angular
  .module('uiRouterStyles', ['ui.router'])
  .directive('head', ['$rootScope', '$compile', '$state', '$interpolate',
    function($rootScope, $compile, $state, $interpolate) {
      return {
        restrict: 'E',
        link: function(scope, elem){
          var start = $interpolate.startSymbol(),
              end = $interpolate.endSymbol();
          var html = '<link rel="stylesheet" ng-repeat="(k, css) in routeStyles track by k" ng-href="' + start + 'css' + end + '" >';
          elem.append($compile(html)(scope));

          // Get the parent state
          var $$parentState = function(state) {
            // Check if state has explicit parent OR we try guess parent from its name
            var name = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];
            // If we were able to figure out parent name then get this state
            return name && $state.get(name);
          };

          scope.routeStyles = [];
          $rootScope.$on('$stateChangeStart', function (evt, toState) {
            // From current state to the root
            scope.routeStyles = [];
            for(var state = toState; state && state.name !== ''; state=$$parentState(state)) {
              if(state && state.data && state.data.css) {
                if(!Array.isArray(state.data.css)) {
                  state.data.css = [state.data.css];
                }
                angular.forEach(state.data.css, function(css) {
                  scope.routeStyles.push(css);
                });
              }
            }
          });
        }
      };
    }
  ]);
