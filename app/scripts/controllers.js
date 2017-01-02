'use strict';

angular.module('gratiaApp')

     .controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.isCurrentPath = function (path) {
        return $location.path() === path;
    };
  }])
     .controller('FlipController', ['$scope', function($scope) {
    $scope.toggleFlip = function() {
        $scope.isFlipped = !$scope.isFlipped;
        $scope.isFlipped2 = !$scope.isFlipped2;
       $scope.isFlipped1 = !$scope.isFlipped1;
    };

}])
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.dishes= menuFactory.getDishes();


        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', function($scope) {

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        var dish= menuFactory.getDish(parseInt($stateParams.id,10));
        $scope.dish = dish;       
    }])

    .controller('DishCommentController', ['$scope', function($scope) {

        var score = [
            {value: "1", label: "1"},
            {value: "2", label: "2"},
            {value: "3", label: "3"},
            {value: "4", label: "4"},
            {value: "5", label: "5"}
        ];
        $scope.comments = [];
        $scope.scores = score;
        $scope.commentFormData = {rating: 5, author: '', comment: '', date: ''};

        $scope.submitComment = function () {

            $scope.commentFormData.date = new Date().toISOString();
            $scope.dish.comments.push($scope.commentFormData);
            $scope.commentForm.$setPristine();

        };
    }])
 
    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function($scope,$stateParams,menuFactory,corporateFactory) {
        $scope.promotion = menuFactory.getPromotion(0);
        $scope.leader = corporateFactory.getLeader(3);
        $scope.featuredDish = menuFactory.getDish(0);
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();
    }]);