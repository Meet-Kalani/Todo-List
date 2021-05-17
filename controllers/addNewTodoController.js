app.controller('addNewTodoController', function ($scope,$http,$location) {
    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];
    $scope.positions = ["To Do", "Doing", "Done"];
    $scope.data = {}
    

    if (window.localStorage.getItem('token') == undefined) {
        $location.path("/login");
    } else{
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
                // console.log(response);
                $location.path('/todo');
            })
        }
    }
    
    
});