/**
 * @author Manuel Mazzuola
 * https://github.com/manuelmazzuola/angular-ui-router-styles
 * Inspired by https://github.com/tennisgent/angular-route-styles
 */

'use strict';

angular
  .module('uiRouterStyles', ['ui.router'])
  .directive('body', ['$rootScope', '$compile', '$state', '$interpolate', '$timeout',
    function($rootScope, $compile, $state, $interpolate, $timeout) {
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

          var removeOldCSS = function(cssSize) {
            $timeout(function() {
              for(var i = 0; i < cssSize; i++) {
                scope.routeStyles.shift()
              }
              scope.routeStyles.reverse();
            }, 200); // Firefox workaround

          };

          $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
            // From current state to the root
            scope.routeStyles = scope.routeStyles || [];
            var oldStylesSize = scope.routeStyles.length;

            for(var state = toState; state && state.name !== ''; state=$$parentState(state)) {
              if(state && state.data !== undefined && state.data.css) {
                if(!Array.isArray(state.data.css)) {
                  state.data.css = [state.data.css];
                }
                angular.forEach(state.data.css, function(css) {
                  if(scope.routeStyles.indexOf(css) === -1) {
                    scope.routeStyles.push(css);
                  }
                });
              }
            }

            var unWatch = scope.$watch(function() {
              return document.styleSheets.length;
            }, function(cssLoaded) {
              unWatch();
              removeOldCSS(oldStylesSize);
            });
          });
        }
      };
    }
  ]);