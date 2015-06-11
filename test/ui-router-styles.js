// test/ui-router-styles.js
'use strict';

describe('Unit: should inject some css', function () {
  var $c, $scope, $state, green = 'green', red = 'red';

  // load the directive
  beforeEach(module('ui.router'));
  beforeEach(module('uiRouterStyles'));
  beforeEach(module(defineStates));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$state_) {
      $c = _$compile_;
      $scope = _$rootScope_.$new();
      $state = _$state_;
    }
  ));

  it("should inject the green css", function() {
    var element;
    element = $c('<head></head>')($scope);
    $state.go(green)
    $scope.$digest();
    expect(element.html()).toContain('<link rel="stylesheet" ng-repeat="(k, css) in routeStyles track by k" ng-href="/green" class="ng-scope" href="/green">');
  });

  it("should inject the red css", function() {
    var element;
    element = $c('<head></head>')($scope);
    $state.go(green)
    $scope.$digest();
    expect(element.html()).toContain('<link rel="stylesheet" ng-repeat="(k, css) in routeStyles track by k" ng-href="/green" class="ng-scope" href="/green">');
    $state.go(red)
    $scope.$digest();
    expect(element.html()).toContain('<link rel="stylesheet" ng-repeat="(k, css) in routeStyles track by k" ng-href="/red" class="ng-scope" href="/red">');
    expect(element.html()).not.toContain('green');
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
