app.controller('addNewTodoController', function ($scope,$http,$location) {
    // Priorities and Positions for showing to the User
    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];
    $scope.positions = ["To Do", "Doing", "Done"];
    $scope.data = {}

    // Checking for Request header if User have Authorization to add new Todo
    if (window.localStorage.getItem('token') == undefined) {
        $location.path("/");
    } else {
        // Submitting Data to add new Todo Route handler
        $scope.submit = () => {
            $http({
                url: '/todo/a',
                method: 'POST',
                data: $scope.data,
                headers: {
                    'authorization': window.localStorage.getItem('token'),
                    'If-Modified-Since': '0',
                    "Pragma": "no-cache",
                    "Expires": -1,
                    "Cache-Control": "no-cache, no-store, must-revalidate"
                }
            }).then((response) => {
                $location.path('/todo');
            })
        }
    }
    
    
});