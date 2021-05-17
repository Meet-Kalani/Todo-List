app.controller('updateTodoController', ($scope, $http, $location, $rootScope, $route) => {
    $scope.data = {};
    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];
    $scope.positions = ["To Do", "Doing", "Done"];

    $scope.data = $rootScope.data;

    $scope.submit = () => {
        $http({
            url: `/todo/u/${$rootScope.todoID}`,
            method: "PUT",
            data: $scope.data,
            headers: {
                'authorization': window.localStorage.getItem('token')
            }
        }).then((response) => {
            $location.path('/todo');
        })
    }
})