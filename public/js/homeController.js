angular.module('imageGallery').controller('homeController', function($scope, $http) {
	$scope.form = {};
	$scope.form.isShow = false;
	$scope.form.name = ""
	$scope.form.age = ""
	$scope.form.gender = ""
	$scope.btnsubmit = function (){
		if(!$scope.form.name){
			$scope.form.isShow = true;
			$scope.form.msg = "Please insert Student name!";
			return;
		}
		console.log()
		if(!$scope.form.age){
			$scope.form.isShow = true;
			$scope.form.msg = "Please insert Student age!";
			return;
		}
		if(!(/^\d+$/.test($scope.form.age))){
			$scope.form.isShow = true;
			$scope.form.msg = "Age must be in digit ";
			return;
		}
		if($scope.form.age.length > 2){
			$scope.form.isShow = true;
			$scope.form.msg = "Age must be between 0-99";
			return;
		}
		if(!$scope.form.gender){
			$scope.form.isShow = true;
			$scope.form.msg = "Please Check gender";
			return;
		}
		var obj = {name : $scope.form.name,age:$scope.form.age,gender:$scope.form.gender}
		$http.post("/student/",JSON.stringify(obj)).success(function(data, status) {
			angular.element(".progress-indicator").hide();
			console.log(data,status)
			$scope.form.name = ""
			$scope.form.age = ""
			$scope.form.gender = ""
			$scope.form.isShow = true;
			$scope.form.msg = "Record is successfully inserted";
			setTimeout(function(){
				$('#errorMsg').hide();
			},3000)
		}).error(function (error, status){
        	console.log(error)
        	$scope.form.isShow = true;
			$scope.form.msg = error;
        	
  		});
	};

});