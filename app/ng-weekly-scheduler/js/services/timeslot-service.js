angular.module('timeSlot', []);

angular.module('timeSlot')
  .provider('timeSlotService', function () {
    this.set = function() {
      console.log('wssss');
    };
    this.$get = ['$rootScope', '$locale', 'tmhDynamicLocale', function ($rootScope, $locale, tmhDynamicLocale) {
    // this.$get = ['$rootScope', function ($rootScope) {
    //
    //   // $rootScope.$on('$TimeSlotChangeSuccess', function () {
    //   //   $rootScope.$broadcast('weeklySchedulerTimeSlotChanged');
    //   // });
    //
    //   return {
    //     set: function (key) {
    //       return key;
    //     }
    //   };
    // }];
  });

