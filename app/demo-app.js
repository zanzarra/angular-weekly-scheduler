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

  .controller('DemoController', ['$scope', '$timeout', 'weeklySchedulerLocaleService', '$log',
    function ($scope, $timeout, localeService, $log) {

      $scope.model = {
        locale: localeService.$locale.id,
        options: {/*monoSchedule: true*/},
        items: [{
          label: 'Item 1',
          editable: true,
          schedules: [
            {start: moment('2017-05-27').toDate(), end: moment('2017-08-01').toDate()}
          ]
        }]
      };

      // $timeout(function () {
      //   $scope.model.items = $scope.model.items.concat([{
      //     label: 'Item 2',
      //     schedules: [
      //       {start: moment('2016-05-03').toDate(), end: moment('2017-02-01').toDate()},
      //       {start: moment('2015-11-20').toDate(), end: moment('2016-02-01').toDate()}
      //     ]
      //   }, {
      //     label: 'Item 3',
      //     schedules: [
      //       {start: moment('2017-08-09').toDate(), end: moment('2017-08-21').toDate()},
      //       {start: moment('2017-09-12').toDate(), end: moment('2017-10-12').toDate()}
      //     ]
      //   }]);
      // }, 1000);

      this.doSomething = function (itemIndex, scheduleIndex, scheduleValue) {
        $log.debug('The model has changed!', itemIndex, scheduleIndex, scheduleValue);
      };

      this.onLocaleChange = function () {
        $log.debug('The locale is changing to', $scope.model.locale);
        localeService.set($scope.model.locale).then(function ($locale) {
          $log.debug('The locale changed to', $locale.id);
        });
      };
    }]);