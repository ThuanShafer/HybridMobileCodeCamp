var app=angular.module('starter', ['ionic'])
    .config(function($ionicConfigProvider)
    {if(ionic.Platform.isAndroid())$ionicConfigProvider.scrolling.jsScrolling(true);
    })
 
    .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/Login')

    $stateProvider
        .state('Home', {
            url: '/Home',
            templateUrl: 'template/Home.html',
            controller:'MenuController'
    })

        .state('Login', {
        url: '/Login',
        templateUrl: 'template/Login.html',
        controller:'loginCtrl'
    })

       
        .state('Gallery',{
            url:'/Gallery',
            templateUrl:'template/Gallery.html'
    })
        
        .state('Camera',{
            url:'/Camera',
            templateUrl:'template/Camera.html'
    })
})

app.controller('mainInfoFactory', ['$scope', '$http', function($scope,$http) {
    $http.get("js/UserDetails.json")
        .success(function (response)
        {
            $scope.advices = response;
        })
        .error(function(data) {
            alert("ERROR");
        });
}]);


app.controller('EventController', ['$scope', '$http', function($scope,$http,$ionicPopup) {
    $http.get("js/Events.json")
        .success(function (response)
        {
            $scope.event = response;
        })
        .error(function(data) {
            alert("ERROR");
        });

    $scope.events= function(item) {
        var msg = item.evname;
        $ionicPopup.alert({
            title: msg
        }).then(function (password) {
    
        });
    }

}]);


  app.controller('MenuController',function($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft=function () {
            $ionicSideMenuDelegate.toggleLeft();
        }
        $scope.toggleRight=function () {
            $ionicSideMenuDelegate.toggleRight();
        }
    })



app.controller('ModelCtrl', function($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('template/UserView.html', function(modal) {
        $scope.UserView = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal
        console.log('clock');
    })

    $scope.openModal = function() {
        $scope.modal.show()
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
})


var namei;
 app.controller('GalleryCtrl',function($scope, $state) {

          $scope.ename=function(name){
             namei=name.evname;
              if(namei != null){
                 $state.go('Gallery');
              }
              else{
                  namei='Gallery';
                  $state.go('Gallery');
              }

          }
         $scope.clear=function(met){
             if(met=='back'){
                 namei='';
                 console.log(namei);
             }
         if(met=='all'){
             console.log('all');
             $state.go('Gallery');
             $scope.myTitle ='All Event Gallery';
             $scope.album = [];

         }
         }

    });



app.controller('instantSearchCtrl',function($scope,$http){
    $http.get('js/data.json').success(function(data, status, headers, config) {
        $scope.items = data.data;
    }).error(function(data, status, headers, config) {
        console.log("No data found..");
    });
});

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.title.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
        });
        return result;
    };
});


app.controller('SpeakerCtrl',function($scope, $state, $ionicPopup, $http, $ionicModal) {
    $http.get("js/Developers.json")
        .success(function (response)
        {
            $scope.developers = response;
        })
        .error(function(data) {
            alert("ERROR");
        });

    $scope.devlop= function(name) {
        var name=name.title;
        console.log(name);
        $ionicPopup.alert({
            template:'<h4>You have selected a developer. Press OK to continue</h4>',
            title:name
        }).then(function (password) {
        });
    }
});



app.controller('loginCtrl', function($scope, $state, $ionicPopup) {

    $scope.signIn = function(user) {
        var pass = user.password;
        var un   = user.username;
        if (un=='admin' && pass=='pass@123')  {
            $state.go('Home');
        }
        else {
            console.log('error');
            $ionicPopup.alert({
                title: 'Authentication failed. Please check user credentials.'
            }).then(function (password) {

            });
        }
        
    };
})



app.controller('UserController', function($scope, $state, $ionicPopup) {
    $scope.puser= function(user) {
        var msg=user.eventname;
        $ionicPopup.alert({
            title: '<img src="img/logo.png" style="width:500px;">'
        }).then(function (password) {
        });
    }
})



app.controller("CameraController", function($scope, $cordovaCamera) {

        $scope.takePicture = function() {
            var options = {
                quality : 75,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function(err) {
            });
        }

    });