angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, NavigationService, $timeout) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.mySlides = [
        'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
    ];
    $scope.formComplete = false;
    $scope.exist = false;
    $scope.validMobileno = false;
    $scope.formData = {};
    $scope.submitStudenForm = function() {
        if ($scope.formData) {
            console.log("$scope.formData", $scope.formData);
            NavigationService.saveStudentForm($scope.formData, function(data) {
                console.log("$scope.formData", $scope.formData);
                console.log("dataformData", data);
                if (data.value == true) {
                    $scope.formComplete = true;
                    $scope.exist = false;
                    $scope.validMobileno = false;
                    console.log("data", data);
                    $timeout(function() {
                        $scope.formComplete = false;
                        $scope.formData = {};
                    }, 2000);
                } else if (data.value == false && data.error.errors.email) {
                    console.log("imin else", data.error.errors);
                    $scope.exist = true;
                    $scope.validMobileno = false;
                } else if (data.value == false && data.error.errors.mobileNumber) {
                    console.log("validMobileno");
                    $scope.validMobileno = true;
                    $scope.exist = false;
                } else {

                }

            })
        }
    }

    $(window).scroll(function() {
      if ($(this).scrollTop() > 500) {
          $('.back-to-top ').fadeIn();
      } else {
          $('.back-to-top ').fadeOut();
      }
  });
})

.controller('headerctrl', function($scope, TemplateService) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $.fancybox.close(true);
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
        console.log("Language CLicked");

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


})

;
