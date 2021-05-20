app.controller('signupController', ($scope, $http, $location) => {
    $scope.data = {};
    
    // Submitting Data to Signup Route Handler
    $scope.submit = function () {
        $http({
            url: '/user/signup',
            method: 'POST',
            data: $scope.data
        }).then((response) => {
            if (response.data == "false") {
                alert('User is already registered! Please try to login');
                $scope.data = {};
            } else {
                $location.path('/todo');
            }
        })
    }
})