'use strict';

angular.module('fireideaz').directive('timerInput', [function() {
    return {
      restrict: 'E',
      scope: {
        timer: '=',
      },
      templateUrl : 'components/timerInput.html',
      link: function($scope) {
        $scope.increment = function() {
          $scope.timer++;
        };

        $scope.decrement = function() {
          $scope.timer--;
        };
      },
    };
  }]
);
