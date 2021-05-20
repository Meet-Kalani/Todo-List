app.controller('updateTodoController', ($scope, $http, $location, $rootScope, $route) => {
    $scope.data = {};
    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];
    $scope.positions = ["To Do", "Doing", "Done"];

    // Setting data in $scope for displaying it in form
    $scope.data = $rootScope.data;

    // Submitting data to Update Route Handler
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