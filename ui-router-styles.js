/**
 * @author Manuel Mazzuola
 * https://github.com/manuelmazzuola/angular-ui-router-styles
 * Inspired by https://github.com/tennisgent/angular-route-styles
 */

(function() {
  'use strict';
  angular
    .module('uiRouterStyles', ['ui.router'])
    .directive('head', uiRouterStylesDirective);

  uiRouterStylesDirective.$inject = ['$rootScope', '$compile', '$state', '$interpolate'];
  function uiRouterStylesDirective($rootScope, $compile, $state, $interpolate) {
    var directive = {
      restrict: 'E',
      link: uiRouterStylesLink
    };

    return directive;

    function uiRouterStylesLink(scope, elem) {
      var start = $interpolate.startSymbol(), end = $interpolate.endSymbol();
      var html = '<link rel="stylesheet" ng-repeat="(k, css) in routeStyles track by k" ng-href="' + start + 'css' + end + '" >';

      scope.routeStyles = [];

      activate();

      ////

      function activate() {
        elem.append($compile(html)(scope));
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccessCallback);
      }

      // Get the parent state
      function $$parentState(state) {
        // Check if state has explicit parent OR we try guess parent from its name
        var name = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];
        // If we were able to figure out parent name then get this state
        return name && $state.get(name);
      }

      function stateChangeSuccessCallback(evt, toState) {
        // From current state to the root
        scope.routeStyles = [];
        for(var state = toState; state && state.name !== ''; state=$$parentState(state)) {
          if(state && state.data && state.data.css) {
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
        scope.routeStyles.reverse();
      }
    }
  }
})();
