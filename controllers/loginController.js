app.controller('loginController', ($scope, $http,$location,$rootScope) => {
    $scope.data = {};
    window.localStorage.clear();
    $rootScope.userName = "";

    $scope.submit = function () {
        $http({
            url: '/user/login',
            method: 'POST',
            data: $scope.data,
        }).then((response) => {
            window.localStorage.setItem('token', `${response.data.token}`);
            $location.path('/todo');
        })
    }
})