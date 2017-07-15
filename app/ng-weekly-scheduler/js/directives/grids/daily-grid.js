/*global GRID_TEMPLATE */
angular.module('weeklyScheduler')
  .directive('dailyGrid', [function () {

    function doGrid(element, attrs, model) {
      var i;
      // Calculate week width distribution
      var tickcount = model.nbDays;
      var ticksize = 100 / tickcount;
      var gridItemEl = GRID_TEMPLATE.css({width: ticksize + '%'});
      var now = model.minDate.clone().startOf('day');

      // Clean element
      element.empty();

      for (i = 0; i < tickcount; i++) {
        var child = gridItemEl.clone();
        if (angular.isUndefined(attrs.noText)) {
          var dateTmp = now.add(i && 1, 'day');
          var dayNumber =  dateTmp.day();
          child.text(dateTmp.date());
          if (dayNumber === 0 || dayNumber === 6) {
            child[0].classList.add('weekend');
          }
        }
        element.append(child);
      }
    }

    return {
      restrict: 'E',
      require: '^weeklyScheduler',
      link: function (scope, element, attrs, schedulerCtrl) {
        if (schedulerCtrl.config) {
          doGrid(element, attrs, schedulerCtrl.config);
        }
        schedulerCtrl.$modelChangeListeners.push(function (newModel) {
          doGrid(element, attrs, newModel);
        });
      }
    };
  }]);
