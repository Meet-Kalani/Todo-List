app.controller('signupController', ($scope, $http, $location) => {
    $scope.data = {};
    
    $scope.submit = function () {
        $http({
            url: '/user/signup',
            method: 'POST',
            data: $scope.data
        }).then(() => {
            $location.path('/todo');
        })
    }
})