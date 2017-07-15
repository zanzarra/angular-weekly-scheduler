angular.module('demoApp', ['ngAnimate', 'weeklyScheduler', 'weeklySchedulerI18N'])

  .config(['weeklySchedulerLocaleServiceProvider', function (localeServiceProvider) {
    localeServiceProvider.configure({
      doys: {'es-es': 4},
      lang: {'es-es': {month: 'Mes', weekNb: 'número de la semana', addNew: 'Añadir'}},
      localeLocationPattern: '/vendor/angular-i18n/angular-locale_{{locale}}.js'
    });
  }])

  .filter('changeDateToOnlyDateAndMonth', function() {
    return function(input) {
      if (input) {
				return input.getDate() + '/' + input.getMonth();
      }
    };
  })

  .controller('DemoController', ['$scope', 'weeklySchedulerLocaleService', '$log',
    function ($scope, localeService, $log) {

      $scope.model = {
        locale: localeService.$locale.id,
        options: {dayDuration: 3, weekDuration: 7, monthDuration: 30, timeSlot: 'month'},
        items: [{
          label: 'Item 1',
          editable: true,
          schedules: [
            // {start: moment('2017-05-27').toDate(), end: moment('2017-08-01').toDate()}
          ]
        }]
      };

      this.doSomething = function (itemIndex, scheduleIndex, scheduleValue) {
        $log.debug('The model has changed!', itemIndex, scheduleIndex, scheduleValue);
      };

      this.onLocaleChange = function () {
        $log.debug('The locale is changing to', $scope.model.locale);
        localeService.set($scope.model.locale).then(function ($locale) {
          $log.debug('The locale changed to', $locale.id);
        });
      };

			this.onTimeSlotChange = function () {
			  console.log('aaaaa');
				$log.debug('The locale is changing to', $scope.model.options.timeSlot);
				// localeService.set($scope.model.timeSlot).then(function ($locale) {
				// 	$log.debug('The locale changed to', $locale.id);
				// });
			};


    }]);