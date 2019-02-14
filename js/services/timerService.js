'use strict';

angular
  .module('fireideaz')
  .factory('TimerService', [function () {
    var timerService = {};
    var messages = [];
    var activeTimer = null;
    var timeoutCallback = null;

    timerService.timeLeft = null;

    timerService.handleTimer = function(activeMessage, _messages) {
      messages = _messages;
      if(!this.validate(activeMessage)) return;
      this.setTimer(activeMessage);
    };

    timerService.validate = function(message) {
      if(!(message && message.timer)) return;
      message.timers.map(function(timer) {
        if(!timer.active) return;
      }).filter(function(timer) { return timer; });
      messages.$save(message);
      return true;
    };

    timerService.setTimer = function(message) {
      var timer = message.timers.find(function(timer) {
        return timer.active &&
               timer.start;
      });
      if(!timer) return;

      // https://www.w3schools.com/howto/howto_js_countdown.asp
      activeTimer = setInterval(function() {
        var now = new Date().getTime();
        var end = (new Date(timer.start).getTime()) +
                  (timer.used || 0) +
                  (timer.duration ? timer.duration * 60 * 1000 : 0);

        if((end - now) < 0) {
          clearInterval(activeTimer);
          timerService.timeLeft = null;
          if(timeoutCallback) timeoutCallback();
          return;
        }

        timerService.timeLeft = (end - now) * 1000;

      }, 1000);
    };

    timerService.setTimeoutCallback = function(callback) {
      timeoutCallback = callback;
    };

    return timerService;
  }]);
