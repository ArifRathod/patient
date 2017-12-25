angular.module('imageGallery').controller('addController', function($scope, $http,$window,toaster,$location) {
	$scope.form = {};
	$scope.form.isShow = false;
	$scope.form.name = "";
	$scope.form.email = "";
	$scope.btnsubmit = function (){
		if(!$scope.form.name){
			toaster.pop('error', "", 'Please insert name!',2000);
			return;
		}
		if(!$scope.form.email){
			toaster.pop('error', "", 'Please insert email!',2000);
			return;
		}
		if(!(/\S+@\S+\.\S+/.test($scope.form.email))){
			toaster.pop('error', "", 'Not valid email!',2000);
			return;
		}
		var obj = {
			first_name : $scope.form.name,
			last_name : 'For test',
			email:$scope.form.email,
			gender: "Female",
			Phone: "(558) 9402918",
			Activity: "2017-01-26",
			Trend: 81,
			Score: 97
		}
		
		angular.element(".progress-indicator").show();
		$http.post("/student/",JSON.stringify(obj)).success(function(data, status) {
			toaster.pop('success', "", "Data saved",2000);
			$scope.form.name = "";
			$scope.form.email = "";
			angular.element(".progress-indicator").hide();
			setTimeout(function(){
				$location.path('/');
				$scope.$apply()
			},2000)
		}).error(function (error, status){
			toaster.pop('error', "", error,2000);
			angular.element(".progress-indicator").hide();
  		});
	};

});