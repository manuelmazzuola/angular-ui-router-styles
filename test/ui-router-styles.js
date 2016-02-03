// test/ui-router-styles.js
'use strict';

describe('Unit: should inject some css', function () {
  var $c, $scope, green = 'green', red = 'red', $state;

  // load the directive
  beforeEach(module('ui.router', function($locationProvider) {
    $locationProvider.html5Mode(false);
  }));

  beforeEach(module('uiRouterStyles'));
  beforeEach(module(defineStates));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$state_) {
      $c = _$compile_;
      $state = _$state_;
      $scope = _$rootScope_.$new();
    }
  ));

  function initStateTo(state) {
    $state.go(state);
    $scope.$apply();
    expect($state.current.name).toBe(state);
  }

  it("should inject the green css", function() {
    var element;
    element = $c('<ui-router-styles />')($scope);
    initStateTo(green);
    $scope.$digest();
    expect($scope.routeStyles).toContain('/green')
  });

  it("should inject the red css", function() {
    var element;
    element = $c('<ui-router-styles />')($scope);
    initStateTo(green);
    $scope.$digest();
    expect($scope.routeStyles).toContain('/green')
    initStateTo(red);
    expect($scope.routeStyles).toContain('/red')
    expect($scope.routeStyles).not.toContain('/green')
  });
});

function defineStates($stateProvider) {
  $stateProvider.state('green', {
    url: '/green',
    template: '<div></div>',
    controller: function() {},
    data: { css: ['/green']}
  });
  $stateProvider.state('red', {
    url: '/red',
    template: '<div></div>',
    controller: function() {},
    data: { css: ['/red']}
  });
}
